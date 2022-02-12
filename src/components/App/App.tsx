import React, {useEffect, useState} from 'react';
import {Route, Switch, Link, useHistory} from "react-router-dom";
import { routes } from '../../utils/routes';
import { initializeApp } from "firebase/app";
import {FormRegister} from "../FormRegister/FormRegister";
import {FormLogin} from "../FormLogin/FormLogin";
import {CreateRecipe} from "../CreateRecipe/CreateRecipe";
import {child, get, getDatabase, ref} from "firebase/database";
import {FullRecipe} from "../FullRecipe/FullRecipe";
import { Container } from '@mui/material';
import { HeaderContainer } from '../../containers/HeaderContainer';
import { CreateRecipeFormComponent } from '../CreateRecipeFormComponent';

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
  const history = useHistory();
  useEffect(() => {
    getRecipes();
  }, [])

  const getRecipes = ():void => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `recipes/`)).then((snapshot) => {
      if (snapshot.exists()) {
        const resultArr: Array<Recipe> = [];
        const result = snapshot.val(); // пришедший объект
        const keysArr = Object.keys(result);
        keysArr.forEach((el) => {
          resultArr.push(result[el]); // из объекта с объектами делаем массив
        })
        setRecipes(resultArr);
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }


  return (
    <div className="App">
      <HeaderContainer isLoged={true}/>
      <Container> {/*Этот контейнер может быть удален в дальнейшем.
      Используйте <Container></Container> внутри своих компонентов, не полагайтесь на этот */}
      <p>{`user email: ${user.email}`}</p>
      <div>
        <Link to={routes.main}>to main </Link>
        <Link to={routes.signUp}>to register </Link>
        <Link to={routes.signIn}>to login </Link>
        <Link to={routes.createRecipe}>to create recipe </Link>
      </div>
        <Switch>
          <Route path={routes.main} exact>
            <div>
              {recipes.length > 0 && recipes.map((recipe, index) => ( // пока решение в лоб
                // потом задемпозируем
                <div key={recipe.id} onClick={() => {history.push(`/recipes/${recipe.id}`)}}>
                  <p>{recipe.title}</p>
                  <p>{recipe.id}</p>
                  <p>{recipe.description}</p>
                  <p>{recipe.owner}</p>
                </div>
              ))}
            </div>
          </Route>
          <Route path={routes.signUp} exact>
            <FormRegister/>
          </Route>
          <Route path={routes.signIn} exact>
            <FormLogin setUser={setUser}/>
          </Route>
          <Route path={routes.createRecipe} exact>
            <br/>
            <CreateRecipeFormComponent />

            <CreateRecipe/>
          </Route>
          <Route path={routes.recipe}>
            <FullRecipe/>
          </Route>
        </Switch>
      </Container>
    </div>
  );
}

export default App;
