import { Stack } from '@mui/material';
import { Recipe } from '../../types/recipeType';
import { FullRecipeHero } from './FullRecipeHero';
import { FullRecipeImg } from './FullRecipeHero/FullRecipeImg';
import { FullRecipeInfo } from './FullRecipeHero/FullRecipeInfo';
import { FullRecipeInstruction } from './FullRecipeInstruction';
import { FullRecipeTags } from './FullRecipeTags';

interface FullRecipeProps {
  recipe: Recipe;
}

export const FullRecipe = ({ recipe }: FullRecipeProps) => {
    return (
        <Stack
            spacing={11} py={4}
            sx={{ alignItems: "center" }}
        >
            <FullRecipeHero
                img={ <FullRecipeImg recipe={ recipe } /> }
                info={ <FullRecipeInfo recipe={ recipe } /> }
            />
            <FullRecipeInstruction recipe={ recipe } />
            <FullRecipeTags recipe={ recipe } />
        </Stack>
    )
}
