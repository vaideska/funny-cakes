import React, {useEffect, useState} from "react";
import {child, get, getDatabase, ref} from "firebase/database";
import {Recipe} from "../../types/recipeType";
import {useRouteMatch} from "react-router-dom";
import { RecipePrintComponent } from '../RecipePrint';

interface MatchParams {
  id: string;
}

export const FullRecipe = (): React.ReactElement => {
  const initStateForm: Recipe = {
    id: "",
    title: "",
    description: "",
    owner: {lastName: 'kek', firstName: 'lol', id: '', profile_picture: '', email: ''},
    date: Date.now(),
    duration: 0,
    diameter: 0,
    imgUrl: "",
    tags: [],
    ingredients: [],
    recipeText: ""};

  const routeMatch = useRouteMatch<MatchParams>();
  const [recipe, setRecipe] = useState<Recipe>(initStateForm);
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
      <p>{`${recipe?.owner.firstName} ${recipe?.owner.lastName}`}</p>
      <RecipePrintComponent recipe={recipe} />
    </div>
  )
}