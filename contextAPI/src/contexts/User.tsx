import {createContext, useState, ReactNode} from 'react';

const UserContext = createContext({
    user: {name: ''},
    dispatch: (name:string) => {},
});

const UserProvider = ({ children }: { children: ReactNode }) => {
    const [name, setName] = useState('hee');

    const value = {user: {name}, dispatch: setName};

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

const UserConsumer = UserContext.Consumer;

export { UserProvider, UserConsumer };
export default UserContext;