import "./LoginRegisterModal.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/ReduxStore";
import { useEffect, useState } from "react";
import { setDisplayLogin } from "../../../../redux/slices/ModalSlice";
import { Modal } from '../../../../components/Modal/Modal';
import { LoginForm } from "../LoginForm/LoginForm";

export const LoginRegisterModal: React.FC = () => {
  const authState = useSelector((state: RootState) => state.authentication);
  const dispatch: AppDispatch = useDispatch();

  const [login, setLogin] = useState<boolean>(true);

  const closeModal = () => {
    dispatch(setDisplayLogin(false));
  };

  const toggleLogin = () => {
    setLogin(!login);
  };

  useEffect(() => {
    if (authState.loggedInUser) {
      closeModal();
     
    }
    return () => {
        if(authState.loggedInUser)
        {
            localStorage.setItem("userId", authState.loggedInUser._id);
        }
    };
  }, [authState.loggedInUser]);

  return (
    <Modal
      content={login ? <LoginForm toggleRegister={toggleLogin}/> : <></>}  
      toggleModal={closeModal}
    />
  );
};
