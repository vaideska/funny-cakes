import { Box,  Container,  Grid } from "@mui/material";
import {RecipeFeedItem} from "../../components/RecipeFeedItem";
import {useSelector} from "react-redux";
import {selectRecipes} from "../../store/slices/recipes/recipesSelectors";
import {useEffect} from "react";
import {useFirebase} from "../../hooks/useFirebase";

export const RecipesFeedContainer = () => {
  const { getRecipes } = useFirebase();
  const { recipes } = useSelector(selectRecipes);
  useEffect(() => {
    if (recipes.length === 0) {
      getRecipes();
    }
  }, []);

  return (
    <Container >
      <Box sx={{py: 4}}>
        <Grid container spacing={4} alignItems={"center"}>
          {recipes.length > 0 && recipes.map((recipe) => (
            <RecipeFeedItem key={recipe.id} recipe={recipe}/>
          ))}
        </Grid>
      </Box>
    </Container>
  )
}
