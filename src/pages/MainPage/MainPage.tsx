import {Container} from "@mui/material";
import {MainPageTags} from "../../components/MainPageTags";
import {RecipesFeed} from "../../components/RecipesFeed";
import React, { ChangeEventHandler, MouseEventHandler } from "react";
import {SelectChangeEvent} from "@mui/material/Select";
import {Recipe} from "../../types/recipeType";
import { PageLoader } from '../../components/UI/PageLoader';

interface MainPageProps {
  tags: string[],
  handleChange: (event: SelectChangeEvent<string[]>) => void,
  handleCardClick: (recipe: Recipe) => void,
  recipes: Recipe[],
  loadedAll: boolean,
  handleDelete: (value: string) => ChangeEventHandler,
  handleMouseDown: MouseEventHandler
}

export const MainPage = ({ tags, handleChange, handleCardClick, recipes, loadedAll, handleDelete, handleMouseDown }:MainPageProps) => {
  return (
    <Container>
      <MainPageTags tags={tags} handleChange={handleChange} handleDelete={handleDelete} handleMouseDown={handleMouseDown}/>
      {loadedAll ?
      <RecipesFeed handleCardClick={handleCardClick} recipes={recipes}/>
      :
      <PageLoader />}
    </Container>
  )
}