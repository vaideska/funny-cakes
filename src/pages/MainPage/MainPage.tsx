import {Container} from "@mui/material";
import {MainPageTags} from "../../components/MainPageTags";
import {RecipesFeed} from "../../components/RecipesFeed";
import React from "react";
import {SelectChangeEvent} from "@mui/material/Select";
import {Recipe} from "../../types/recipeType";
import { PageLoader } from '../../components/UI/PageLoader';

interface MainPageProps {
  tags: string[],
  handleChange: (event: SelectChangeEvent<string[]>) => void,
  handleCardClick: (recipe: Recipe) => void,
  recipes: Recipe[],
  loadedAll: boolean
}

export const MainPage = ({ tags, handleChange, handleCardClick, recipes, loadedAll }:MainPageProps) => {
  return (
    <Container>
      <MainPageTags tags={tags} handleChange={handleChange}/>
      {loadedAll ?
      <RecipesFeed handleCardClick={handleCardClick} recipes={recipes}/>
      :
      <PageLoader />}
    </Container>
  )
}