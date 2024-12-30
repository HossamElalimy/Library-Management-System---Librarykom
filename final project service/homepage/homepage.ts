export default function HomePage(): JSX.Element {
  const displayLogin = useSelector((state: RootState) => state.modal.displayLogin);

  return (
    <div className="page">
      {displayLogin && <LoginRegisterModal />}
      Home page
    </div>
  );
}
