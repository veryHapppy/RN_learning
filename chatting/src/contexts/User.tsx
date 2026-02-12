import { useState, createContext } from "react";
import { ReactNode } from "react";

interface UserContextProps {
    user: {email: string | null, uid: string | null},
    dispatch: (params: UserInfo) => void,
};

const UserContext = createContext<UserContextProps>({
    user: {email: null, uid: null},
    dispatch: () => {},
});

interface UserProviderProps {
    children: ReactNode,
};

interface UserInfo {
    email: string | null,
    uid: string | null,
};

const UserProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<UserInfo>({email:null, uid:null});
    const dispatch = ({email, uid}: UserInfo) => {
        setUser({email, uid});
    };
    const value : UserContextProps = { user, dispatch };
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};

export { UserContext, UserProvider };