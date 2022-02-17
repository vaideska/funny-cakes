import React, {useCallback, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {selectRecipes, selectRecipesByTags} from "../../store/slices/recipes/recipesSelectors";
import {useFirebase} from "../../hooks/useFirebase";
import {RecipesFeedContainer} from "../RecipesFeedContainer";
import {useHistory} from "react-router-dom";
import {Container} from "@mui/material";
import {MainPageTagsContainer} from "../MainPageTagsContainer";
import {SelectChangeEvent} from "@mui/material/Select";

export const MainPageFeedContainer = () => {
  const [tags, setTags] = useState<string[]>([]);
  const recipes = useSelector(selectRecipesByTags(tags));
  const { getRecipes } = useFirebase();
  const history = useHistory();

  useEffect(() => {
    if (recipes.length === 0) {
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
    <Container >
      <MainPageTagsContainer tags={tags} handleChange={handleChange}/>
      <RecipesFeedContainer handleCardClick={handleCardClick} recipes={recipes}/>
    </Container>
  )
}