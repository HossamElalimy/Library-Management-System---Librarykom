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
      if (authState.loggedInUser) {
        localStorage.setItem('userId', authState.loggedInUser._id);
      }
    };
  }, [authState.loggedInUser]);

  return (
    <Modal
      content={
        login ? (
          <LoginForm toggleRegister={toggleLogin} />
        ) : (
          <RegisterForm toggleLogin={toggleLogin} />
        )
      }
      toggleModal={closeModal}
    />
  );
};
//in login registration model file in features