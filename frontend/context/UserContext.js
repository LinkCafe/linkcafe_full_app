import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";


const UserContext = createContext({ user: {}, setUser: () => {} });

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await JSON.parse(AsyncStorage.getItem('user'))
                setUser(response);
            } catch (error) {
                console.log(error);   
            }   
        }
        fetchUser();
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;