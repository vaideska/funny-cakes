import { Paper, SxProps } from '@mui/material';
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
        mx: 'auto',
        width: '100%',
        borderRadius: 3,
        overflow: 'hidden',
        maxWidth: { md: '1000px', lg: '1100px' },
      }}
    >
      <ResponsiveImage
        src={recipe?.imgUrl}
        alt="тортик"
        sx={{
          pb: { xs: '75%', sm: '55%', md: '44%' },
        }}
      />
    </Paper>
  );
};
