import { Box,  Container,  Grid } from "@mui/material";
import {Recipe} from "../../types/recipeType";
import {RecipeFeedItem} from "../RecipeFeedItem";

interface RecipesFeedProps {
  recipes: Recipe[]
}

export const RecipesFeed = ({recipes}: RecipesFeedProps) => {

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

// Вариант с единоразовой загрузкой рецептов
// const dbRef = ref(getDatabase());
// get(child(dbRef, `recipes/`)).then((snapshot) => {
//   if (snapshot.exists()) {
//     const resultArr: Array<Recipe> = [];
//     const result = snapshot.val(); // пришедший объект
//     const keysArr = Object.keys(result);
//     keysArr.forEach((el) => {
//       resultArr.push(result[el]); // из объекта с объектами делаем массив
//     })
//     setRecipes(resultArr);
//   } else {
//     console.log("No data available");
//   }
// }).catch((error) => {
//   console.error(error);
// });