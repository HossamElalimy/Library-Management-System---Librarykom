import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../../redux/ReduxStore';
import { updateUser, resetUser } from '../../../redux/slices/AuthenticationSlice';
import './UpdateUserForm.css';

export const UpdateUserForm: React.FC = () => {
    const userState = useSelector((state: RootState) => state.authentication);
    const dispatch: AppDispatch = useDispatch();
    const [displayUpdate, setDisplayUpdate] = useState<boolean>(false);
    const [user, setUser] = useState(userState.profileUser || undefined);
    const navigate = useNavigate();

    const updateUserState = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDisplayUpdate(true);
        if (e.target.value && e.target.name && user) {
            setUser({
                ...user,
                [e.target.name]: e.target.value,
            });
        }
    };

    const submitUpdatedUser = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (user) {
            dispatch(updateUser(user));
            setDisplayUpdate(false);
        }
    };

    const logout = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        localStorage.removeItem('userId');
        dispatch(resetUser('loggedInUser'));
        dispatch(resetUser('profileUser'));
        navigate('/');
    };

    useEffect(() => {
        if (!user) {
            setUser(userState.profileUser);
        }
    }, [userState.profileUser, user]);

    return (
        <form className="update-user-form">
            <div className="update-user-input-group">
                <h4>First Name</h4>
                <input
                    className="update-user-input"
                    name="firstName"
                    value={user?.firstName || ''}
                    onChange={updateUserState}
                    disabled={userState.loggedInUser?._id !== userState.profileUser?._id}
                />
            </div>
            <div className="update-user-input-group">
                <h4>Last Name</h4>
                <input
                    className="update-user-input"
                    name="lastName"
                    value={user?.lastName || ''}
                    onChange={updateUserState}
                    disabled={userState.loggedInUser?._id !== userState.profileUser?._id}
                />
            </div>
            <div className="update-user-input-group">
                <h4>Email</h4>
                <input
                    className="update-user-input"
                    name="email"
                    value={user?.email || ''}
                    onChange={updateUserState}
                    disabled={userState.loggedInUser?._id !== userState.profileUser?._id}
                />
            </div>
            {displayUpdate ? (
                <button className="profile-button" onClick={submitUpdatedUser}>
                    Update Profile
                </button>
            ) : (
                userState.loggedInUser?._id === userState.profileUser?._id && (
                    <button className="profile-button" onClick={logout}>
                        Logout of Account
                    </button>
                )
            )}
        </form>
    );
};