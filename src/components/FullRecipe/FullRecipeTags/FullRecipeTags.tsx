import { Chip, Container, Grid } from '@mui/material';
import { Recipe } from '../../../types/recipeType';
import { tagList } from '../../../utils/dictionary';

interface FullRecipeTagsProps {
  recipe: Recipe;
}

export const FullRecipeTags = ({ recipe }: FullRecipeTagsProps) => {
  return (
    <Container>
      <Grid container spacing={1} pt={0} justifyContent={'center'}>
        {recipe?.tags?.map((tag: string) => (
          <Grid item key={tag}>
            <Chip clickable variant="outlined" label={tagList[tag]} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
