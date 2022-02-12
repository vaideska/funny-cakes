import {
  Container,
  Grid,
} from "@mui/material";
import React, {useCallback, useEffect, useState} from "react";
import {getDatabase, ref, onValue, off} from "firebase/database";
import {Recipe} from "../../components/App/App";
import {RecipeFeedItem} from "../../components/RecipeFeedItem";

interface RecipesContainerProps {
  recipes: Recipe[]
}

export const RecipesContainer = ({recipes}: RecipesContainerProps) => {

  return (
    <Container disableGutters={true}>
      <Grid container spacing={4} alignItems={"center"}>
        {recipes.length > 0 && recipes.map((recipe) => (
          <RecipeFeedItem key={recipe.id} recipe={recipe}/>
        ))}
      </Grid>
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