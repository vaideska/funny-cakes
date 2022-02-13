import React, {useCallback, useEffect, useState} from 'react';
import {Route, Switch, Link} from "react-router-dom";
import { routes } from '../../utils/routes';
import { initializeApp } from "firebase/app";
import {FullRecipe} from "../FullRecipe/FullRecipe";
import { HeaderContainer } from '../../containers/HeaderContainer';
import {RecipesFeed} from "../RecipesFeed";
import {child, get, getDatabase, onValue, ref} from "firebase/database";
import { AuthZModalContainer } from '../../containers/AuthZModalContainer';
import { CreateRecipeFormContainer } from '../../containers/CreateRecipeContainer/CreateRecipeFormContainer';
import { Recipe } from "../../types/recipeType";
import { Container } from '@mui/material';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {login} from "../../store/slices/authZ/authZSlice";
import {useAppDispatch} from "../../hooks/useAppDispatch";

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
  const dispatch = useAppDispatch();
  useEffect(() => {
    getRecipes();
    listenUser();
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
      });
    }, []
  )

  const listenUser = useCallback( // подписываемся на юзера, если залогинены, то грузим его данные и кладем в стор.
    () => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          getUserData(user.uid);
        } else {
          console.log('signed out');
        }
      });
    }, []
  )

  const getUserData = useCallback(
    (userId: string) => {
      const dbRef = ref(getDatabase());
      get(child(dbRef, `users/${userId}`)).then((snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          dispatch(login(userData))
        } else {
          throw new Error('User data not found');
        }
      }).catch((error) => {
        console.error(error);
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
