import React, { useCallback, useState, FormEvent, ChangeEvent } from 'react';
import { Recipe, RecipeIngredient, RecipeInstruction } from '../../../types/recipeType';
import { useHistory } from 'react-router-dom';
import { routes } from '../../../utils/routes';
import { CreateRecipeForm } from './';
import { userSelector} from "../../../store/slices/authZ/authZSelectors";
import { useSelector } from "react-redux";
import { useFirebase } from "../../../hooks/useFirebase";
import { SelectChangeEvent } from '@mui/material';

export const CreateRecipeFormContainer = () => {
  const owner = useSelector(userSelector);

  const initStateForm: Recipe = {
    id: "",
    title: "",
    type: "full recipe",
    description: "",
    owner: owner,
    date: Date.now(),
    duration: 0,
    diameter: 0,
    imgUrl: "",
    tags: [],
    ingredients: [],
    recipeText: []};

  const [form, setForm] = useState(initStateForm);
  const [isLoadFile, setIsLoadFile] = useState(false);
  const [selectedFile, setSelectedFile] = useState(new File([], ''));
  const [isEditForm, setIsEditForm] = useState(true);
  const [error, setError] = useState('');
  const [ingredientList, setIngredientList] = useState<RecipeIngredient[]>([{name: '', unit: 'gr', count: 0}]);
  const [instructionList, setInstructionList] = useState<RecipeInstruction[]>([{title: '', text: ''}]);


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
    const tags = form.type !== "full recipe" ? [] : form.tags;
    const recipeObject = {...form, 'ingredients': ingredientList, tags, owner, recipeText: instructionList};
    createRecipe(recipeObject)
      .then((recipeId) => {
        form.type === "full recipe" ? history.replace(`${routes.recipe}/${recipeId}`) : history.replace(routes.main);
      })
      .catch((e) => {
        setError('Что-то пошло не так... Попробуйте позже.');
        console.log(e);
      });
  }, [form, history, createRecipe, ingredientList, selectedFile, owner, instructionList]);

  const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | SelectChangeEvent<string>) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm(prev => ({...prev, [name]: value}));
  }, []);

  const handleUploadFile = useCallback((e: ChangeEvent<HTMLInputElement> ) => {
    const fileObject = e.target.files ? e.target.files[0] : new File([], '');         //TS просил проверить массив files на null
    if (fileObject.name === '') return;
    console.log('!!!!');
    setIsLoadFile(true);
    setSelectedFile(fileObject);
    uploadFile(fileObject).then((url) => {
        setForm(prev => {
          setIsLoadFile(false);
          return {...prev, 'imgUrl': url};
        });
    });
  }, [uploadFile]);

  const propsCreateRecipe = {
    selectedFile, 
    isEditForm,
    form,
    handleSubmit,
    handleChange,
    setIngredientList,
    ingredientList,
    instructionList,
    setInstructionList,
    setForm,
    handleUploadFile,
    error,
    isLoadFile,
    setIsLoadFile
  }

  return <CreateRecipeForm {...propsCreateRecipe}/>

};
