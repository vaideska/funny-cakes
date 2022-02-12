import React, {useCallback, useEffect, useState} from 'react';
import {Route, Switch, Link} from "react-router-dom";
import { routes } from '../../utils/routes';
import { initializeApp } from "firebase/app";
import { FormRegister } from "../FormRegister/FormRegister";
import {FormLogin} from "../FormLogin/FormLogin";
import {CreateRecipe} from "../CreateRecipe/CreateRecipe";
import {FullRecipe} from "../FullRecipe/FullRecipe";
import { HeaderContainer } from '../../containers/HeaderContainer';
import {RecipesFeed} from "../RecipesFeed";
import {getDatabase, onValue, ref} from "firebase/database";

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

interface User {
  email: string,
  uid: string
}

interface RecipeIngredient {
  name: string,
  unit: string,
  count: number
}

export interface Recipe {
  id: string,
  title: string,
  description: string,
  owner: string,
  date: number,
  duration: number,
  diameter: number,
  imgUrl: string,
  tags: string[],
  ingredients: RecipeIngredient[],
  recipeText: string
}

function App() {
  const [user, setUser] = useState<User>({} as User);
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
      <HeaderContainer isLoged={true}/>
      <p>{`user email: ${user.email}`}</p>
      <div>
        <Link to={routes.main}>to main </Link>
        <Link to={routes.signUp}>to register </Link>
        <Link to={routes.signIn}>to login </Link>
        <Link to={routes.createRecipe}>to create recipe </Link>
      </div>
        <Switch>
          <Route path={routes.main} exact>
            <RecipesFeed recipes={recipes}/>
          </Route>
          <Route path={routes.signUp} exact>
            <FormRegister/>
          </Route>
          <Route path={routes.signIn} exact>
            <FormLogin setUser={setUser}/>
          </Route>
          <Route path={routes.createRecipe} exact>
            <CreateRecipe/>
          </Route>
          <Route path={routes.recipe}>
            <FullRecipe/>
          </Route>
        </Switch>
    </div>
  );
}

export default App;
