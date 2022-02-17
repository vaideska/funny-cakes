import React, {useCallback, useEffect} from "react";
import {useSelector} from "react-redux";
import {selectRecipes} from "../../store/slices/recipes/recipesSelectors";
import {useFirebase} from "../../hooks/useFirebase";
import {RecipesFeedContainer} from "../RecipesFeedContainer";
import {useHistory} from "react-router-dom";
import {Container} from "@mui/material";

export const MainPageFeedContainer = () => {
  const { recipes } = useSelector(selectRecipes);
  const { getRecipes } = useFirebase();
  const history = useHistory();

  useEffect(() => {
    if (recipes.length === 0) {
      getRecipes();
    }
  }, [getRecipes]);

  const handleCardClick = useCallback(
    (recipeId:string) => {
      history.push(`/recipes/${recipeId}`)
    }, [history]
  )

  return (
    <Container >
      <RecipesFeedContainer handleCardClick={handleCardClick} recipes={recipes}/>
    </Container>
  )
}