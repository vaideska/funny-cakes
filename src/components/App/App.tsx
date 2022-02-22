import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { routes } from '../../utils/routes';
import { HeaderContainer } from '../Header';
import { AuthZModalContainer } from '../AuthZModal/AuthZModalContainer';
import { CreateRecipeFormContainer } from '../CreateRecipe/CreateRecipeForm';
import { useFirebase } from '../../hooks/useFirebase';
import { MainPageContainer } from '../../pages/MainPage';
import { RecipeBuilderContainer } from '../RecipeBuilder';
import { MyRecipesContainer } from '../MyRecipes';
import { FullRecipePage } from '../../pages/FullRecipePage';

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
          <MainPageContainer />
        </Route>
        <Route path={routes.createRecipe} exact>
          <CreateRecipeFormContainer recipe={undefined} />
        </Route>
        <Route path={routes.recipeBuilder} exact>
          <RecipeBuilderContainer />
        </Route>
        <Route path={routes.myRecipes} exact>
          <MyRecipesContainer />
        </Route>
        <Route path={`${routes.recipe}/:id`}>
          <FullRecipePage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
