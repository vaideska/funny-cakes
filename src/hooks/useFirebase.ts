import {useCallback, useEffect} from "react";
import {child, get, getDatabase, ref, set, push, onValue, DataSnapshot} from "firebase/database";
import { getStorage, ref as storeRef, uploadBytes, getDownloadURL } from "firebase/storage";
import {login, setAuthZModalVariant} from "../store/slices/authZ/authZSlice";
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth";
import {useAppDispatch} from "./useAppDispatch";
import { Recipe } from "../types/recipeType";
import { setRecipes, addRecipe } from "../store/slices/recipes/recipesSlice";

type WriteUserData = (userId: string, firstName: string, lastName: string, email: string | null, profile_picture: string) => void;
type CreateUser = (email: string, password: string, firstName: string, lastName: string) => void;
type GetUserData = (userId: string) => void;
type UserLogin = (email: string, password: string) => void;
type CreateRecipe = (recipe: Recipe) => Promise<string | null>;
type UploadFile = (fileObject: File) => Promise<string>;

export const useFirebase = () => {
  const dispatch = useAppDispatch();
  const auth = getAuth();
  const db = getDatabase();
  const recipesRef = ref(db, 'recipes/');
  useEffect(() => {
    console.log('useEffect in getterUserData');
    //getUserData('vvfiRH3KHeZPQF5ByPbBCDw0D783');
  }, [])

  const listenUser = useCallback( // подписываемся на юзера, если залогинены, то грузим его данные и кладем в стор.
    () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log(user.uid);
          getUserData(user.uid);
        } else {
          console.log('signed out');
        }
      });
    }, []
  )

  const getUserData:GetUserData = useCallback(
    (userId) => {
      const dbRef = ref(getDatabase());
      get(child(dbRef, `users/${userId}`)).then((snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          dispatch(login(userData))
          console.log(userData);
        } else {
          console.log('error');
          throw new Error('User data not found');
        }
      }).catch((error) => {
        console.error(error);
      });
    }, []
  )

  const createUser:CreateUser = useCallback(
    (email, password, firstName, lastName) => {
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
        });
    }, []
  )

  const writeUserData:WriteUserData = useCallback(
    (
      userId,
      firstName,
      lastName,
      email,
      profile_picture
    ) => {
      const db = getDatabase();
      set(ref(db, 'users/' + userId), {
        id: userId,
        firstName,
        email,
        lastName,
        profile_picture,
      })
        .then(() => {
          console.log('success!')
          dispatch(setAuthZModalVariant());
        })
    }, []
  )

  const loginUser:UserLogin = useCallback(
    (email, password) => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          if (!user) {
            throw new Error('User not found')
          }
          //getUserData(user.uid);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage, errorCode);
        });
    }, []
  )

  const createRecipe:CreateRecipe = useCallback((recipe) => {
    const db = getDatabase();
    const recipeId = push(child(ref(db), 'recipes/')).key;
    return set(ref(db, 'recipes/' + recipeId), {...recipe, id: recipeId}).then(() => recipeId)
    }, []
  )

  const getRecipeById = (id: string): Promise<void> => {
    const dbRef = ref(getDatabase());
    return get(child(dbRef, `recipes/${id}`))
    .then((snapshot) => {
        if (snapshot.exists()) {
            const result = snapshot.val(); // пришедший объект
            dispatch(addRecipe(result))
        } else {
            console.log("No data available");
            //
        }
    })
    .catch((error) => {
        console.error(error);
    });
  }

  const uploadFile:UploadFile = useCallback((fileObject) => {
    const storage = getStorage();
    const storageRef = storeRef(storage, fileObject.name);
    return uploadBytes(storageRef, fileObject).then((snapshot) => getDownloadURL(snapshot.ref));
    }, []
  )

  const getRecipes = useCallback(
    () => {
      onValue(recipesRef, (snapshot) => {
        const recipes = snapshot.val();
        const recipesArr: Array<Recipe> = [];
        const keysArr = Object.keys(recipes);
        keysArr.forEach((recipeKey) => {
          recipesArr.push(recipes[recipeKey]);
        })
        dispatch(setRecipes(recipesArr));
      });
    }, []
  )

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
  }
}