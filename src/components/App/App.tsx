import React, {useState} from 'react';
import {Route, Switch, Link} from "react-router-dom";
import { routes } from '../../utils/routes';
import { initializeApp } from "firebase/app";
import {FormRegister} from "../FormRegister/FormRegister";
import {FormLogin} from "../FormLogin/FormLogin";
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


function App() {
  const [user, setUser] = useState<User>({} as User);
  return (
    <div className="App">
      <p>{`user email: ${user.email}`}</p>
      <div>
        <Link to={routes.main}>to main </Link>
        <Link to={routes.signUp}>to register </Link>
        <Link to={routes.signIn}>to login </Link>
        <Link to={routes.createRecipe}>to create recipe </Link>
      </div>
      <Switch>
        <Route path={routes.main} exact>
          <h1>Main page</h1>
        </Route>
        <Route path={routes.signUp} exact>
          <FormRegister/>
        </Route>
        <Route path={routes.signIn} exact>
          <FormLogin setUser={setUser}/>
        </Route>
        <Route path={routes.createRecipe} exact>
          <h1>Create recipe</h1>
        </Route>
        <Route path={routes.recipe}>
          <h1>{`recipe id:`}</h1>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
