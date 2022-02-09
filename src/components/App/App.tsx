import React from 'react';
import {Route, Switch} from "react-router-dom";
import { routes } from '../../utils/routes';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route path={routes.main} exact>
          <h1>Main page</h1>
        </Route>
        <Route path={routes.signUp} exact>
          <h1>Sign up</h1>
        </Route>
        <Route path={routes.signIn} exact>
          <h1>Sign in</h1>
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
