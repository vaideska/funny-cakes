import React, {useEffect, useState} from "react";
import {child, get, getDatabase, ref} from "firebase/database";
import {Recipe} from "../../types/recipeType";
import {useRouteMatch} from "react-router-dom";

interface MatchParams {
  id: string;
}

export const FullRecipe = (): React.ReactElement => {
  const routeMatch = useRouteMatch<MatchParams>();
  const [recipe, setRecipe] = useState<Recipe | undefined>()
  useEffect(() => {
    if (routeMatch.params.id) {
      getRecipe();
    } else {
      console.log('РЕЦЕПТ НЕ НАЙДЕН');
      // здесь сделаем редирект на 404
    }
  }, []);


  const getRecipe = ():void => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `recipes/${routeMatch.params.id}`)).then((snapshot) => {
      if (snapshot.exists()) {
        const result = snapshot.val(); // пришедший объект
        setRecipe(result);
      } else {
        console.log("No data available");
        //
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  return (
    <div>
      <p>{recipe?.title}</p>
      <p>{recipe?.description}</p>
      <p>{recipe?.owner}</p>
    </div>
  )
}