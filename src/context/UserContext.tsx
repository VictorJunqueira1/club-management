import React, { createContext, useContext, useState } from 'react';

interface UserContextType {
    userRole: 'director' | 'viewer';
    setUserRole: React.Dispatch<React.SetStateAction<'director' | 'viewer'>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userRole, setUserRole] = useState<'director' | 'viewer'>('director');

    return (
        <UserContext.Provider value={{ userRole, setUserRole }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};