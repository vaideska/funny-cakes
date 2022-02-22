import {useEffect, useState} from 'react';
import {Route, Switch} from "react-router-dom";
import { routes } from '../../utils/routes';
import { HeaderContainer } from '../Header';
import { AuthZModalContainer } from '../AuthZModal/AuthZModalContainer';
import { CreateRecipeFormContainer } from '../CreateRecipe/CreateRecipeForm';
import {useFirebase} from "../../hooks/useFirebase";
import {MainPageContainer} from "../../pages/MainPage";
import { FullRecipeContainer } from '../FullRecipe';
import {RecipeBuilderContainer} from "../RecipeBuilder";
import { FullScreenModal } from '../FullScreenModal';
import { Button } from '@mui/material';


function App() {
  const { listenUser } = useFirebase();
  useEffect(() => {
    listenUser();
  }, []);

const [open, setOpen] = useState(false) // для примера

const hadnleClickOpen = () => {
  setOpen(true)
}

const handleClose = () => {
  setOpen(false)
}

  return (
    <div className="App">
      <AuthZModalContainer />
      <HeaderContainer />
        <Switch>
          <Route path={'/fullModal'}>
            <Button onClick={hadnleClickOpen}>Открыть модалку</Button>
            <FullScreenModal isOpen={open} handleClose={handleClose}>
              <FullRecipeContainer recipeId='-Mw1Z8r-GbWi1YxvjC4a'/>
            </FullScreenModal>
          </Route>
          <Route path={routes.main} exact>
            <MainPageContainer/>
          </Route>
          <Route path={routes.createRecipe} exact>
            <CreateRecipeFormContainer />
          </Route>
          <Route path={routes.recipeBuilder} exact>
            <RecipeBuilderContainer/>
          </Route>
          <Route path={`${routes.recipe}/:id`}>
            <FullRecipeContainer />
          </Route>
        </Switch>
    </div>
  );
}

export default App;
