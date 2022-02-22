import { Box, Container, Grid } from '@mui/material';
import { Recipe } from '../../types/recipeType';
import { RecipeFeedItem } from '../RecipesFeedItem';

interface RecipesFeedContainerProps {
  handleCardClick: (recipe: Recipe) => void;
  recipes: Recipe[];
}

export const RecipesFeed = ({
  handleCardClick,
  recipes,
}: RecipesFeedContainerProps) => {
  return (
    <Box sx={{ py: 4 }}>
      <Grid container spacing={4} alignItems={'center'}>
        {recipes.length > 0 &&
          recipes.map((recipe) => (
            // Не придумал как сделать по другому. Такой подход позволит полностью переиспользовать RecipesFeed
            // в степере передав в него функцию, которая будет открывать диалоговое окно.
            <RecipeFeedItem
              key={recipe.id}
              recipe={recipe}
              handleCardClick={() => handleCardClick(recipe)}
            />
          ))}
      </Grid>
    </Box>
  );
};
