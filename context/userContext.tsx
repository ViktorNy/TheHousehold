import React, { createContext, FC, useContext, useReducer } from 'react';
import { User } from '../data/data';
import { UserAction } from '../store/user/userActions';
import userReducer from '../store/user/userReducer';
import { initialState } from '../store/user/userState';

interface ContextValue {
    user: User;
    dispatch: React.Dispatch<UserAction>
}

const userContext = createContext<ContextValue>({} as any);

const userProvider: FC = ({ children }) => {
    const [{ user }, dispatch] = useReducer(userReducer, initialState);

    return (
        <userContext.Provider
            value={{
                user,
                dispatch
            }}
        >
            {children}
        </userContext.Provider>
    );
};
export const useUser = () => useContext(userContext);
export default userProvider;