import { Container, Stack, Typography } from '@mui/material'
import { Recipe } from '../../../types/recipeType'
import { FullRecipeInstructionStep } from './FullRecipeInstructionStep'

interface FullRecipeInstructionProps {
    recipe: Recipe;
}

export const FullRecipeInstruction = ({ recipe }: FullRecipeInstructionProps) => {
    return (
        <Container>
            <Typography
                component='h2'
                variant='h5'
                align='center'
                sx={{
                    pb: 5,
                }}
            >
                Инструкция приготовления
            </Typography>
            <Stack
                spacing={6}
                sx={{ alignItems: "center" }}
            >
                {recipe.recipeText.map((step, index) => (
                    <FullRecipeInstructionStep key={index} children={step.text} index={index} />
                ))}
            </Stack>
        </Container>
    )
}
