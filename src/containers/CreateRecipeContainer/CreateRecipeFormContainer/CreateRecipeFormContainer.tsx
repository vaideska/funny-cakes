import React, { useCallback, useState } from 'react';
import { Recipe, RecipeIngredient } from '../../../types/recipeType';
import {child, getDatabase, ref, set, push} from "firebase/database";
import { useHistory } from 'react-router-dom';
import { routes } from '../../../utils/routes';
import { CreateRecipeFormComponent } from '../../../components/CreateRecipe/CreateRecipeFormComponent';
import {userSelector} from "../../../store/slices/authZ/authZSelectors";
import {useSelector} from "react-redux";

  const initFile: any = null;

export const CreateRecipeFormContainer = () => {
  const userId = useSelector(userSelector).id;

  const initStateForm: Recipe = {
    id: "",
    title: "",
    description: "",
    owner: userId,
    date: Date.now(),
    duration: 0,
    diameter: 0,
    imgUrl: "",
    tags: [],
    ingredients: [],
    recipeText: ""};

  const [form, setForm] = useState(initStateForm);
  const [selectedFile, setSelectedFile] = useState(initFile);
  const [isEditForm, setIsEditForm] = useState(true);
  const [ingredientList, setIngredientList] = useState<RecipeIngredient[]>([{name: '', unit: 'gr', count: 0}]);

  const history = useHistory();

  const handleSubmit = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsEditForm(false);
    const db = getDatabase();
    const recipeId = push(child(ref(db), 'recipes/')).key;
    set(ref(db, 'recipes/' + recipeId), {...form, id: recipeId, 'ingredients': ingredientList})
      .then(() => {
        history.replace(`${routes.recipe}/${recipeId}`);
      })
      .catch((e) => console.log('вывод ошибки', e.text));
  }, [form, history, ingredientList]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm({...form, [name]: value});
}, [form]);

  const handleUploadFile = useCallback((e: any) => {      //TODO: не нашла какой тип события для загрузки
    setSelectedFile(e.target.files[0]);
    setForm({...form, 'imgUrl': e.target.files[0].name});   //TODO: что именно загружать в объек для сервера? Отдельный метод с firebase?
  }, [form]);

  const propsCreateRecipe = {
    selectedFile, 
    isEditForm, 
    handleSubmit,
    handleChange,
    setIngredientList,
    setForm,
    form,
    handleUploadFile
  }

  return <CreateRecipeFormComponent {...propsCreateRecipe}/>

};
