import { Paper } from '@mui/material';
import { Recipe } from '../../../../types/recipeType';
import { ResponsiveImage } from '../../../UI/ResponsiveImage';

interface FullRecipeImgProps {
  recipe: Recipe;
}

export const FullRecipeImg = ({ recipe }: FullRecipeImgProps) => {
  return (
    <Paper
      elevation={12}
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
      }}
    >
      <ResponsiveImage src={recipe?.imgUrl} alt="тортик" />
    </Paper>
  );
};
