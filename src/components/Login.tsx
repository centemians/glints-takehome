import firebase from "firebase/compat/app";
import * as React from "react";
import styled from "styled-components";
// import { get, Store } from "idb-keyval";
import { auth, provider } from "../config";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/actions/user";
import { get, createStore } from "idb-keyval";

const MainContainer = styled.div`
  height: 100vh;
  background-color: #f0f2f5;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Portal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-top: 50px;
`;

const FacebookLogo = styled.img`
  height: 106px;
`;

const Text = styled.span`
  font-family: Helvetica, Arial, sans-serif;
  font-size: 28px;
  font-weight: normal;
  line-height: 32px;
  width: 500px;
`;

const SignIn = styled.button`
  display: flex;
  background-color: #1877f2;
  border: none;
  border-radius: 6px;
  font-size: 20px;
  line-height: 48px;
  padding: 0 16px;
  width: 332px;
  color: #fff;
  justify-content: center;
  text-align: center;
  position: absolute;
  bottom: 200px;

  &:hover,
  :focus {
    cursor: pointer;
    outline: none;
  }
`;

const Login = () => {
  const dispatch: any = useDispatch();

  const signIn = () => {
    auth
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        return auth
          .signInWithPopup(provider)
          .then((result) => {
            dispatch(updateUser(result.user));
          })
          .catch((error) => alert(error.message));
      })
      .catch((err) => alert(err.message));
  };

  const getDataFromIndexedDb = async () => {
    const customStore = createStore(
      "firebaseLocalStorageDb",
      "firebaseLocalStorage"
    );
    const result = await get(
      "firebase:authUser:AIzaSyCTOb-HclL80NWFRDFS_8quA7M_nErWvZY:[DEFAULT]",
      customStore
    );

    return result;
  };

  React.useEffect(() => {
    (async () => {
      const result: any = await getDataFromIndexedDb();
      if (result && result.value) {
        dispatch(updateUser(result.value));
      }
    })();
  }, []);

  return (
    <MainContainer>
      <Portal>
        <Text>Welcome to Glints Experience Portal.</Text>
      </Portal>
      <SignIn type="submit" onClick={signIn}>
        Sign In
      </SignIn>
    </MainContainer>
  );
};

export default Login;
