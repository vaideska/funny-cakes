import React, { useCallback, useState, FormEvent, ChangeEvent } from 'react';
import { Recipe, RecipeIngredient } from '../../../types/recipeType';
import { useHistory } from 'react-router-dom';
import { routes } from '../../../utils/routes';
import { CreateRecipeFormComponent } from '../../../components/CreateRecipe/CreateRecipeFormComponent';
import {userSelector} from "../../../store/slices/authZ/authZSelectors";
import {useSelector} from "react-redux";
import { useFirebase } from "../../../hooks/useFirebase";

export const CreateRecipeFormContainer = () => {
  const owner = useSelector(userSelector);

  const initStateForm: Recipe = {
    id: "",
    title: "",
    description: "",
    owner: owner,
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
  const { createRecipe, uploadFile } = useFirebase();

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    if (selectedFile.name === '') {
      setError('Добавьте фотографию!');
      return;
    } else {
      setError('');
    }
    setIsEditForm(false);
    const recipeObject = {...form, 'ingredients': ingredientList};
    createRecipe(recipeObject)
      .then((recipeId) => {
        history.replace(`${routes.recipe}/${recipeId}`);
      })
      .catch((e) => {
        setError('Что-то пошло не так... Попробуйте позже.');
        console.log(e);
      });
  }, [form, history, createRecipe, ingredientList, selectedFile]);

  const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm(prev => ({...prev, [name]: value}));
  }, []);

  const handleUploadFile = useCallback((e: ChangeEvent<HTMLInputElement> ) => {
    const fileObject = e.target.files ? e.target.files[0] : new File([], '');         //TS просил проверить массив files на null
    if (fileObject.name === '') return;
    setSelectedFile(fileObject);
    uploadFile(fileObject).then((url) => {
        setForm(prev => ({...prev, 'imgUrl': url}));
    });
  }, [uploadFile]);

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
