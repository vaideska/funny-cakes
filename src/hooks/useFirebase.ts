import {useCallback, useEffect} from "react";
import {child, get, getDatabase, ref, set} from "firebase/database";
import {login, setAuthZModalVariant} from "../store/slices/authZ/authZSlice";
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth";
import {useAppDispatch} from "./useAppDispatch";

type WriteUserData = (userId: string, firstName: string, lastName: string, email: string | null, profile_picture: string) => void;
type CreateUser = (email: string, password: string, firstName: string, lastName: string) => void;
type GetUserData = (userId: string) => void;
type UserLogin = (email: string, password: string) => void;

export const useFirebase = () => {
  const dispatch = useAppDispatch();
  const auth = getAuth();
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

  return {
    getterUser: getUserData,
    listenUser: listenUser,
    regUser: createUser,
    writeUserData,
    loginUser
  }
}