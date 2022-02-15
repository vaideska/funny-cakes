import React, { useCallback, useState, FormEvent, ChangeEvent } from 'react';
import { Recipe, RecipeIngredient } from '../../../types/recipeType';
import {child, getDatabase, ref, set, push} from "firebase/database";
import { useHistory } from 'react-router-dom';
import { routes } from '../../../utils/routes';
import { CreateRecipeFormComponent } from '../../../components/CreateRecipe/CreateRecipeFormComponent';
import {userSelector} from "../../../store/slices/authZ/authZSelectors";
import {useSelector} from "react-redux";

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
  const [selectedFile, setSelectedFile] = useState(new File([], ''));
  const [isEditForm, setIsEditForm] = useState(true);
  const [error, setError] = useState('');
  const [ingredientList, setIngredientList] = useState<RecipeIngredient[]>([{name: '', unit: 'gr', count: 0}]);

  const history = useHistory();

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    setIsEditForm(false);
    const db = getDatabase();
    const recipeId = push(child(ref(db), 'recipes/')).key;
    set(ref(db, 'recipes/' + recipeId), {...form, id: recipeId, 'ingredients': ingredientList})
      .then(() => {
        history.replace(`${routes.recipe}/${recipeId}`);
      })
      .catch((e) => {
        setError('Что-то пошло не так... Попробуйте позже.');
        console.log(e);
      });
  }, [form, history, ingredientList]);

  const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm(prev => ({...prev, [name]: value}));
  }, []);

  const handleUploadFile = useCallback((e: ChangeEvent<HTMLInputElement> ) => {
    const fileObject = e.target.files ? e.target.files[0] : new File([], '');         //TS просил проверить массив files на null
    setSelectedFile(fileObject);
    setForm(prev => ({...prev, 'imgUrl': fileObject.name}));   //TODO: что именно загружать в объек для сервера? Отдельный метод с firebase?
  }, []);

  const propsCreateRecipe = {
    selectedFile, 
    isEditForm, 
    handleSubmit,
    handleChange,
    setIngredientList,
    ingredientList,
    setForm,
    handleUploadFile,
    error
  }

  return <CreateRecipeFormComponent {...propsCreateRecipe}/>

};
