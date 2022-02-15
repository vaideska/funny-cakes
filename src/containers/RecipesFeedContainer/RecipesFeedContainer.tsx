import { Box,  Container,  Grid } from "@mui/material";
import {RecipeFeedItem} from "../../components/RecipeFeedItem";
import {useSelector} from "react-redux";
import {selectRecipeById, selectRecipes} from "../../store/slices/recipes/recipesSelectors";
import {useCallback, useEffect} from "react";
import {getDatabase, onValue, ref} from "firebase/database";
import {setRecipes} from "../../store/slices/recipes/recipesSlice";
import {Recipe} from "../../types/recipeType";
import {useAppDispatch} from "../../hooks/useAppDispatch";

export const RecipesFeedContainer = () => {
  const db = getDatabase();
  const recipesRef = ref(db, 'recipes/');
  const dispatch = useAppDispatch();
  const { recipes } = useSelector(selectRecipes);
  //const recipe = useSelector(selectRecipeById('-MviMYM9m7LqVV2w2Jr1'));
  //console.log(recipe);
  useEffect(() => {
    if (recipes.length === 0) {
      getRecipes();
    }
  }, []);

  const getRecipes = useCallback(
    () => {
      onValue(recipesRef, (snapshot) => {
        const recipes = snapshot.val();
        const recipesArr: Array<Recipe> = [];
        const keysArr = Object.keys(recipes);
        keysArr.forEach((recipeKey) => {
          recipesArr.push(recipes[recipeKey]);
        })
        dispatch(setRecipes(recipesArr));
      });
    }, []
  )

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
