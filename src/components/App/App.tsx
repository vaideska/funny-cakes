import {useEffect} from 'react';
import {Route, Switch} from "react-router-dom";
import { routes } from '../../utils/routes';
import { HeaderContainer } from '../Header';
import { AuthZModalContainer } from '../AuthZModal/AuthZModalContainer';
import { CreateRecipeFormContainer } from '../CreateRecipe/CreateRecipeForm';
import { useFirebase } from "../../hooks/useFirebase";
import { MainPageContainer } from "../../pages/MainPage";
import { FullRecipeContainer } from '../FullRecipe';
import {RecipeBuilderContainer} from "../RecipeBuilder";
import {MyRecipesContainer} from "../MyRecipes";
import { MultiFullRecipe } from '../MultiFullRecipe';


function App() {
  const { listenUser } = useFirebase();

  useEffect(() => {
    listenUser();
  }, []);

  //!--------- mockdata
  const mockRecipes = [
    {
      "date": 1645016471587,
      "description": "Главное испечь побольше блинов!",
      "diameter": 30,
      "duration": 80,
      "id": "-Mw1c3dqTcOIKqRwRr9v",
      "imgUrl": "https://firebasestorage.googleapis.com/v0/b/napoleon-tech.appspot.com/o/9605e2f434-2.jpg?alt=media&token=e641f826-0fb0-4ef9-b35c-aee6fbce36b9",
      "ingredients": [
        {
          "count": 200,
          "name": "Блины",
          "unit": "gr"
        },
        {
          "count": 30,
          "name": "Крем",
          "unit": "tablespoon"
        }
      ],
      "owner": {
        "email": "lolkek@gmail.com",
        "firstName": "Лол",
        "id": "JzDMbCHomKbHOrvXkGJIosvMMxr1",
        "lastName": "Кек",
        "profile_picture": "https://clck.ru/b87cr"
      },
      "recipeText": [{'title': 'Checheche', 'text': 'Ddadada'}],
      "tags": [
        "vanilla cream",
        "mastic"
      ],
      "title": "Блинный торт",
      "type": "full recipe"
    },
    {
      "date": 1645016471587,
      "description": "Главное испечь побольше блинов2!",
      "diameter": 30,
      "duration": 80,
      "id": "-Mw1cOTKP5-05De0jmI6",
      "imgUrl": "https://firebasestorage.googleapis.com/v0/b/napoleon-tech.appspot.com/o/9605e2f434-2.jpg?alt=media&token=e641f826-0fb0-4ef9-b35c-aee6fbce36b9",
      "ingredients": [
        {
          "count": 200,
          "name": "Блины",
          "unit": "gr"
        },
        {
          "count": 30,
          "name": "Крем",
          "unit": "tablespoon"
        }
      ],
      "owner": {
        "email": "lolkek@gmail.com",
        "firstName": "Лол",
        "id": "JzDMbCHomKbHOrvXkGJIosvMMxr1",
        "lastName": "Кек",
        "profile_picture": "https://clck.ru/b87cr"
      },
      "recipeText": [{'title': 'Checheche', 'text': 'Ddadada'}],
      "tags": [
        "vanilla cream",
        "mastic"
      ],
      "title": "Блинный торт",
      "type": "full recipe"
    },
  ]
  //!-----------------
  return (
    <div className="App">
      <AuthZModalContainer />
      <HeaderContainer />
        <Switch>
          <Route path={'/multiFullRecipe'}>
            <MultiFullRecipe recipes={mockRecipes} duration={400} />
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
          <Route path={routes.myRecipes} exact>
            <MyRecipesContainer/>
          </Route>
          <Route path={`${routes.recipe}/:id`}>
            <FullRecipeContainer />
          </Route>
        </Switch>
    </div>
  );
}

export default App;
