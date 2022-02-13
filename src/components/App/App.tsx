import React, {useCallback, useEffect, useState} from 'react';
import {Route, Switch, Link} from "react-router-dom";
import { routes } from '../../utils/routes';
import { initializeApp } from "firebase/app";
import {FullRecipe} from "../FullRecipe/FullRecipe";
import { HeaderContainer } from '../../containers/HeaderContainer';
import {RecipesFeed} from "../RecipesFeed";
import {getDatabase, onValue, ref} from "firebase/database";
import { AuthZModalContainer } from '../../containers/AuthZModalContainer';
import { CreateRecipeFormContainer } from '../../containers/CreateRecipeContainer/CreateRecipeFormContainer';
import { Recipe } from "../../types/recipeType";
import { Container } from '@mui/material';

(function() {
  const firebaseConfig = {
    apiKey: "AIzaSyCCalDHvx-N-OD-UE4P7XQKdjj3bdCnDN0",
    authDomain: "napoleon-tech.firebaseapp.com",
    databaseURL: "https://napoleon-tech-default-rtdb.firebaseio.com",
    projectId: "napoleon-tech",
    storageBucket: "napoleon-tech.appspot.com",
    messagingSenderId: "674037683443",
    appId: "1:674037683443:web:abc96f116192681c5a5386"
  };
  const app = initializeApp(firebaseConfig)
})();

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const db = getDatabase();
  const recipesRef = ref(db, 'recipes/');

  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = useCallback(
    () => {
      onValue(recipesRef, (snapshot) => { // колбэк срабатывает при каждом изменении бд
        const recipes = snapshot.val();
        const recipesArr: Array<Recipe> = [];
        const keysArr = Object.keys(recipes);
        keysArr.forEach((recipeKey) => {
          recipesArr.push(recipes[recipeKey]);
        })
        setRecipes(recipesArr);
        console.log('сработало');
      });
    }, []
  )


  return (
    <div className="App">
      <AuthZModalContainer />
      <HeaderContainer />
      <Container>
        <Link to={routes.main}>to main </Link>
        <Link to={routes.createRecipe}>to create recipe </Link>
      </Container>
        <Switch>
          <Route path={routes.main} exact>
            <RecipesFeed recipes={recipes}/>
          </Route>
          <Route path={routes.createRecipe} exact>
            <CreateRecipeFormContainer />
          </Route>
          <Route path={`${routes.recipe}/:id`}>
            <FullRecipe/>
          </Route>
        </Switch>
    </div>
  );
}

export default App;
