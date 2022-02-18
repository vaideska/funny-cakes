import {Container} from "@mui/material";
import {MainPageTags} from "../../components/MainPageTags";
import {RecipesFeed} from "../../components/RecipesFeed";
import React from "react";
import {SelectChangeEvent} from "@mui/material/Select";
import {Recipe} from "../../types/recipeType";

interface MainPageProps {
  tags: string[],
  handleChange: (event: SelectChangeEvent<string[]>) => void,
  handleCardClick: (recipeId: string) => void;
  recipes: Recipe[]
}

export const MainPage = ({tags, handleChange, handleCardClick, recipes}:MainPageProps) => {
  return (
    <Container>
      <MainPageTags tags={tags} handleChange={handleChange}/>
      <RecipesFeed handleCardClick={handleCardClick} recipes={recipes}/>
    </Container>
  )
}