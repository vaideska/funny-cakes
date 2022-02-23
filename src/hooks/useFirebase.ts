import { useCallback, useEffect } from 'react';
import {
  child,
  get,
  getDatabase,
  ref,
  set,
  push,
  onValue,
  DataSnapshot,
} from 'firebase/database';
import {
  getStorage,
  ref as storeRef,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import {
  login,
  setAuthZModalVariant,
  setLoading,
} from '../store/slices/authZ/authZSlice';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useAppDispatch } from './useAppDispatch';
import { Recipe } from '../types/recipeType';
import { setRecipes, addRecipe, updateRecipe } from '../store/slices/recipes/recipesSlice';

type WriteUserData = (
  userId: string,
  firstName: string,
  lastName: string,
  email: string | null,
  profile_picture: string
) => void;
type CreateUser = (
  email: string,
  password: string,
  firstName: string,
  lastName: string
) => void;
type GetUserData = (userId: string) => void;
type UserLogin = (email: string, password: string) => void;
type CreateRecipe = (recipe: Recipe) => Promise<string | null>;
type UploadFile = (fileObject: File) => Promise<string>;

export const useFirebase = () => {
  const dispatch = useAppDispatch();
  const auth = getAuth();
  const db = getDatabase();
  const dbRef = ref(db);
  const recipesRef = ref(db, 'recipes/');
  useEffect(() => {
    //const recipeId = '-MwH8vqjHqlL6qpYoGIT';
    //deleteRecipe(recipeId).then(() => console.log(`recipe ${recipeId} deleted`)) // вызов удаления рецепта. в .then нужно добавить логику
    //либо редиректа на главную, либо всплывающее окно с текстом об успешности операции
  }, []);

  const listenUser = useCallback(() => {
    dispatch(setLoading(true));
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getUserData(user.uid);
      } else {
        console.log('signed out');
        dispatch(setLoading(false));
      }
    });
  }, []);

  const getUserData: GetUserData = useCallback((userId) => {
    getData(`users/${userId}`)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          dispatch(login(userData));
        } else {
          console.log('error');
          throw new Error('User data not found');
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, []);

  const createUser: CreateUser = useCallback(
    (email, password, firstName, lastName) => {
      dispatch(setLoading(true));
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user; // созданный юзер
          console.log(user, 'user registered');
          writeUserData(
            user.uid,
            firstName,
            lastName,
            user.email,
            'https://clck.ru/b87cr'
          );
          getUserData(user.uid);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage, errorCode);
          dispatch(setLoading(false));
        });
    },
    []
  );

  const writeUserData: WriteUserData = useCallback(
    (userId, firstName, lastName, email, profile_picture) => {
      setData('users/' + userId, {
        id: userId,
        firstName,
        email,
        lastName,
        profile_picture,
      }).then(() => {
        dispatch(setAuthZModalVariant());
      });
    },
    []
  );

  const loginUser: UserLogin = useCallback((email, password) => {
    dispatch(setLoading(true));
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (!user) {
          throw new Error('User not found');
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode);
        dispatch(setLoading(false));
      });
  }, []);

  const createRecipe: CreateRecipe = useCallback((recipe) => {
    const recipeId = getNewItemKey('/recipes');
    return setData('recipes/' + recipeId, { ...recipe, id: recipeId }).then(
      () => recipeId
    );
  }, []);

  const getRecipeById = (id: string): Promise<void> => {
    return getData(`recipes/${id}`)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const result = snapshot.val(); // пришедший объект
          dispatch(addRecipe(result));
        } else {
          console.log('No data available');
          //
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const uploadFile: UploadFile = useCallback((fileObject) => {
    const storage = getStorage();
    const storageRef = storeRef(storage, fileObject.name);
    return uploadBytes(storageRef, fileObject).then((snapshot) =>
      getDownloadURL(snapshot.ref)
    );
  }, []);

  const getRecipes = useCallback(() => {
    onValue(recipesRef, (snapshot) => {
      const recipes = snapshot.val();
      const recipesArr: Array<Recipe> = [];
      const keysArr = Object.keys(recipes);
      keysArr.forEach((recipeKey) => {
        recipesArr.push(recipes[recipeKey]);
      });
      dispatch(setRecipes(recipesArr));
    });
  }, []);

  const deleteRecipe = useCallback((recipeId) => {
    return setData(`/recipes/${recipeId}`, null);
  }, []);

  const updateRecipeData = useCallback(
    (recipeId, data) => {
      dispatch(updateRecipe(data));
      return setData(`/recipes/${recipeId}`, data)
    }, []
  );

  const setData = useCallback((path, data) => {
    return set(ref(db, path), data);
  }, []);

  const getData = useCallback((path) => {
    return get(child(dbRef, path));
  }, []);

  const getNewItemKey = useCallback((path) => {
    return push(child(dbRef, path)).key;
  }, []);

  return {
    getterUser: getUserData,
    listenUser: listenUser,
    regUser: createUser,
    writeUserData,
    loginUser,
    createRecipe,
    uploadFile,
    getRecipes,
    getRecipeById,
    deleteRecipe,
    updateRecipeData
  }
}
