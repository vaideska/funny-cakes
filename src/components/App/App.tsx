import {useEffect} from 'react';
import {Route, Switch} from "react-router-dom";
import { routes } from '../../utils/routes';
import { HeaderContainer } from '../../containers/HeaderContainer';
import { AuthZModalContainer } from '../../containers/AuthZModalContainer';
import { CreateRecipeFormContainer } from '../../containers/CreateRecipeContainer/CreateRecipeFormContainer';
import {useFirebase} from "../../hooks/useFirebase";
import {MainPageContainer} from "../../containers/MainPageContainer";
import { FullRecipeContainer } from '../../containers/FullRecipeContainer';


function App() {
  const { listenUser } = useFirebase();
  useEffect(() => {
    listenUser();
  }, []);

  return (
    <div className="App">
      <AuthZModalContainer />
      <HeaderContainer />
        <Switch>
          <Route path={routes.main} exact>
            <MainPageContainer/>
          </Route>
          <Route path={routes.createRecipe} exact>
            <CreateRecipeFormContainer />
          </Route>
          <Route path={`${routes.recipe}/:id`}>
            <FullRecipeContainer />
          </Route>
        </Switch>
    </div>
  );
}

export default App;
