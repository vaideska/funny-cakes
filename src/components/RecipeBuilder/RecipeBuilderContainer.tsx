import * as React from 'react';
import {useEffect, useState} from "react";
import {Container} from "@mui/material";
import {RecipesFeed} from "../RecipesFeed";
import {Recipe} from "../../types/recipeType";
import {useSelector} from "react-redux";
import {selectRecipesByType, selectRecipesStatus} from "../../store/slices/recipes/recipesSelectors";
import {useFirebase} from "../../hooks/useFirebase";
import {RecipeBuilder} from "./RecipeBuilder";

interface SelectedType {
  [key: number]: Recipe[]
}

const steps = ['Выберите бисквит', 'Выберите крем', 'Выберите покрытие'];


export const RecipeBuilderContainer = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [recipeSelected, setRecipeSelected] = useState(false);
  const [resultRecipe, setResultRecipe] = useState<Recipe[]>([]);
  const biscuitsRecipes = useSelector(selectRecipesByType('cake layer'));
  const creamRecipes = useSelector(selectRecipesByType('cream'));
  const surfaceRecipes = useSelector(selectRecipesByType('surface'));

  const { getRecipes } = useFirebase();
  const { loadedAll } = useSelector(selectRecipesStatus)
  useEffect(() => {
    if (loadedAll === false) {
      getRecipes();
    }
    if (activeStep === steps.length) {
      const resultIdsRecipes = resultRecipe.map(el => el.id);
      console.log(resultIdsRecipes);
    }
  }, [activeStep]);

  const handleNext = () => {
    setRecipeSelected(false);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleRecipeClick = (recipe:Recipe) => {
    setRecipeSelected(true);
    const resultRecipeCopy = resultRecipe;
    resultRecipeCopy[activeStep] = recipe;
    setResultRecipe(resultRecipeCopy);
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const recipeBuilderProps = {
    steps,
    activeStep,
    resultRecipe,
    recipeSelected,
    handleBack,
    handleNext
  }

  const selectedType:SelectedType = {
    0: biscuitsRecipes,
    1: creamRecipes,
    2: surfaceRecipes,
    3: []
  }

  const recipeFeedProps = {
    handleCardClick :handleRecipeClick,
    recipes: selectedType[activeStep]
  }

  return (
    <Container sx={{pt: 2}}>
      <RecipeBuilder {...recipeBuilderProps}/>
      <RecipesFeed {...recipeFeedProps}/>
    </Container>
  );
}
