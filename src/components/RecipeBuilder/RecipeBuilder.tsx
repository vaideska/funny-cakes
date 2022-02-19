import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useEffect, useState} from "react";
import {Container} from "@mui/material";
import {RecipesFeed} from "../RecipesFeed";
import {Recipe} from "../../types/recipeType";
import {useSelector} from "react-redux";
import {selectRecipesByType, selectRecipesStatus} from "../../store/slices/recipes/recipesSelectors";
import {useFirebase} from "../../hooks/useFirebase";

const steps = ['Выберите корж', 'Выберите крем', 'Выберите покрытие'];


export const RecipeBuilder = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [recipeSelected, setRecipeSelected] = useState(false);
  const [resultRecipe, setResultRecipe] = useState<Recipe[]>([]);
  const biscuitsRecipes = useSelector(selectRecipesByType('cake layer'));
  const creamRecipes = useSelector(selectRecipesByType('cream'));
  const surfaceRecipes = useSelector(selectRecipesByType('surface'));

  const { getRecipes } = useFirebase();
  const { loadedAll } = useSelector(selectRecipesStatus)
  useEffect(() => {
    //console.log(activeStep, !!resultRecipe[activeStep]);

    if (loadedAll === false) {
      getRecipes(); //TODO: убрать, когда сюда можно будет попасть с главной
    }
    if (activeStep === steps.length) {
      console.log('Рецепт Создан. Показываем всплывающее окно');
      console.log(resultRecipe);
    }
  }, [activeStep]);

  const handleNext = () => {
    setRecipeSelected(false);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleRecipeClick = (recipe:Recipe) => {
    setRecipeSelected(true);
    const resultRecipeCopy = resultRecipe;
    resultRecipeCopy[activeStep] = recipe;
    setResultRecipe(resultRecipeCopy);
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Container sx={{pt: 2}}>
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
        {activeStep === steps.length ? ( // думаю можно убрать, сделаем наверно редирект
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
      {activeStep === 0 && <RecipesFeed handleCardClick={handleRecipeClick} recipes={biscuitsRecipes}/>}
      {activeStep === 1 && <RecipesFeed handleCardClick={handleRecipeClick} recipes={creamRecipes}/>}
      {activeStep === 2 && <RecipesFeed handleCardClick={handleRecipeClick} recipes={surfaceRecipes}/>}
    </Container>
  );
}
