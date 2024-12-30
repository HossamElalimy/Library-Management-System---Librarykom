import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './redux/ReduxStore';
import HomePage from './pages/HomePage/HomePage';
import LayoutPage from './pages/LayoutPage/LayoutPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { fetchUser } from './redux/slices/AuthenticationSlice';
import ProfilePage from './pages/ProfilePage/ProfilePage';

function App() {
  const loggedInUser = useSelector((state: RootState) => state.authentication.loggedInUser);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    let userId = localStorage.getItem('userId');
    if (userId && !loggedInUser) {
      dispatch(
        fetchUser({
          userId,
          property: 'loggedInUser',
        })
      );
    }
  }, [loggedInUser]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="" element={<></>} />
        <Route path="/catalog" element={<></>} />
        <Route path="/resource/:barcode" element={<></>} />
        <Route path="/profile/:userId" element={<></>} />
      </Routes>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
//in redux file