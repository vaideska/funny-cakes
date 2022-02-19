import React, {useCallback, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {selectRecipesByTags} from "../../store/slices/recipes/recipesSelectors";
import {useFirebase} from "../../hooks/useFirebase";
import {useHistory} from "react-router-dom";
import {SelectChangeEvent} from "@mui/material/Select";
import {MainPage} from "../../pages/MainPage/MainPage";
import { selectRecipesStatus} from "../../store/slices/recipes/recipesSelectors";

export const MainPageContainer = () => {
  const { getRecipes } = useFirebase();
  const { loadedAll } = useSelector(selectRecipesStatus)
  const [tags, setTags] = useState<string[]>([]);
  const recipes = useSelector(selectRecipesByTags(tags, 'full recipe'));
  const history = useHistory();

  useEffect(() => {
    if (loadedAll === false) {
      getRecipes();
    }
  }, [getRecipes]);


  const handleChange = useCallback((event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;

    setTags(() => {
        const newTags = typeof value === 'string' ? value.split(',') : value;
        return newTags;
      }
    );
  }, []);


  const handleCardClick = useCallback(
    (recipeId:string) => {
      history.push(`/recipes/${recipeId}`)
    }, [history]
  )

  return (
    <MainPage
      loadedAll={loadedAll}
      tags={tags}
      handleChange={handleChange}
      handleCardClick={handleCardClick}
      recipes={recipes}
    />
  )
}