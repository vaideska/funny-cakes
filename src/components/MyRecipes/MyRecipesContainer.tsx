import {useCallback, useEffect} from "react";
import {useFirebase} from "../../hooks/useFirebase";
import {useSelector} from "react-redux";
import {
  selectRecipesByOwner,
  selectRecipesStatus
} from "../../store/slices/recipes/recipesSelectors";
import {useHistory} from "react-router-dom";
import {RecipesFeed} from "../RecipesFeed";
import {userSelector} from "../../store/slices/authZ/authZSelectors";

export const MyRecipesContainer = () => {
  const { getRecipes } = useFirebase();
  const { loadedAll } = useSelector(selectRecipesStatus)
  const { id } = useSelector(userSelector);
  const recipes = useSelector(selectRecipesByOwner(id));
  const history = useHistory();
  useEffect(() => {
    if (loadedAll === false) {
      getRecipes();
    }
  }, [getRecipes]);

  const handleRecipeClick = useCallback(
    (recipeData) => {
      history.push('/recipes/' + recipeData.id)
    }, []
  )
  return (
    <RecipesFeed handleCardClick={handleRecipeClick} recipes={recipes}/>
  )
}