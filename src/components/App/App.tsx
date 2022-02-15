import React, {useCallback, useEffect, useState} from 'react';
import {Route, Switch} from "react-router-dom";
import { routes } from '../../utils/routes';
import {FullRecipe} from "../FullRecipe/FullRecipe";
import { HeaderContainer } from '../../containers/HeaderContainer';
import {RecipesFeedContainer} from "../../containers/RecipesFeedContainer";
import {child, get, getDatabase, onValue, ref} from "firebase/database";
import { AuthZModalContainer } from '../../containers/AuthZModalContainer';
import { CreateRecipeFormContainer } from '../../containers/CreateRecipeContainer/CreateRecipeFormContainer';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {login} from "../../store/slices/authZ/authZSlice";
import {useAppDispatch} from "../../hooks/useAppDispatch";


function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    listenUser();
  }, []);

  const listenUser = useCallback( // подписываемся на юзера, если залогинены, то грузим его данные и кладем в стор.
    () => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        console.log(user);
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
        console.log('SNAPSHOT', snapshot.val());
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
        <Switch>
          <Route path={routes.main} exact>
            <RecipesFeedContainer/>
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
