import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import * as React from "react";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {Recipe} from "../../types/recipeType";

interface RecipeBuilderProps {
  steps: string[],
  activeStep: number,
  resultRecipe: Recipe[],
  recipeSelected: boolean,
  handleBack: () => void,
  handleNext: () => void
}

export const RecipeBuilder = ({
                                steps,
                                activeStep,
                                resultRecipe,
                                recipeSelected,
                                handleBack,
                                handleNext
}: RecipeBuilderProps) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          {resultRecipe.map((subRecipe) => <p key={subRecipe.id}>{subRecipe.title}</p>)}
        </>
      ) : (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>{recipeSelected ? `Выбран ${resultRecipe[activeStep].title}` : 'Рецепт не выбран'}</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Назад
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext} disabled={!recipeSelected}>
              {activeStep === steps.length - 1 ? 'Завершить' : 'Следующий шаг'}
            </Button>
          </Box>
        </>
      )}
    </Box>
  )
}