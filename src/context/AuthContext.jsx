import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('vtu_user_session');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        const users = JSON.parse(localStorage.getItem('vtu_users') || '[]');
        const foundUser = users.find(u => u.email === email && u.password === password);
        if (foundUser) {
            const role = email === 'admin@primedata.com' ? 'admin' : 'user';

            // Backward compatibility for existing users
            if (!foundUser.referralCode) {
                foundUser.referralCode = Math.random().toString(36).substring(2, 8).toUpperCase();
                foundUser.referralsCount = 0;
                foundUser.referralsEarned = 0;
                localStorage.setItem('vtu_users', JSON.stringify(users));
            }
            if (!foundUser.transferPin) {
                foundUser.transferPin = '1234';
                localStorage.setItem('vtu_users', JSON.stringify(users));
            }

            const sessionUser = {
                name: foundUser.name,
                email: foundUser.email,
                phone: foundUser.phone,
                role,
                twoFactorEnabled: foundUser.twoFactorEnabled || false,
                referralCode: foundUser.referralCode,
                referralsCount: foundUser.referralsCount || 0,
                referralsEarned: foundUser.referralsEarned || 0,
                transferPin: foundUser.transferPin || '1234',
                biometricEnabled: foundUser.biometricEnabled || false,
                biometricType: foundUser.biometricType || 'fingerprint'
            };

            setUser(sessionUser);
            localStorage.setItem('vtu_user_session', JSON.stringify(sessionUser));
            localStorage.setItem('vtu_last_user_email', foundUser.email);
            return { success: true };
        }
        return { success: false, message: 'Invalid email or password' };
    };

    const loginWithBiometric = () => {
        const lastEmail = localStorage.getItem('vtu_last_user_email');
        const users = JSON.parse(localStorage.getItem('vtu_users') || '[]');
        
        // Find the last user, or fallback to ANY registered user for prototype demonstration
        let foundUser = users.find(u => u.email === lastEmail);
        if (!foundUser && users.length > 0) {
            foundUser = users[users.length - 1]; // Fallback to most recently registered user
        }
        
        if (foundUser) {
            const role = foundUser.email === 'admin@primedata.com' ? 'admin' : 'user';
            const sessionUser = {
                name: foundUser.name, email: foundUser.email, phone: foundUser.phone, role,
                twoFactorEnabled: foundUser.twoFactorEnabled || false,
                referralCode: foundUser.referralCode, referralsCount: foundUser.referralsCount || 0,
                referralsEarned: foundUser.referralsEarned || 0, transferPin: foundUser.transferPin || '1234',
                biometricEnabled: true, biometricType: foundUser.biometricType || 'fingerprint'
            };
            setUser(sessionUser);
            localStorage.setItem('vtu_user_session', JSON.stringify(sessionUser));
            localStorage.setItem('vtu_last_user_email', foundUser.email);
            return { success: true, user: sessionUser };
        }
        return { success: false, message: 'Please register an account first to use biometric login' };
    };

    const signup = (userData) => {
        const users = JSON.parse(localStorage.getItem('vtu_users') || '[]');
        if (users.find(u => u.email === userData.email)) {
            return { success: false, message: 'Email already exists' };
        }
        const role = userData.email === 'admin@primedata.com' ? 'admin' : 'user';
        const refCode = Math.random().toString(36).substring(2, 8).toUpperCase();

        if (userData.invitedByRef) {
            const referrerIndex = users.findIndex(u => u.referralCode === userData.invitedByRef);
            if (referrerIndex !== -1) {
                users[referrerIndex].referralsCount = (users[referrerIndex].referralsCount || 0) + 1;
                users[referrerIndex].referralsEarned = (users[referrerIndex].referralsEarned || 0) + 500;
            }
        }

        const newUser = {
            name: userData.name, email: userData.email, phone: userData.phone, password: userData.password,
            role, twoFactorEnabled: false, referralCode: refCode, referralsCount: 0, referralsEarned: 0,
            transferPin: userData.transferPin || '1234', biometricEnabled: false, biometricType: 'fingerprint'
        };

        users.push(newUser);
        localStorage.setItem('vtu_users', JSON.stringify(users));

        return { success: true };
    };

    const updateUser = (updatedData) => {
        const users = JSON.parse(localStorage.getItem('vtu_users') || '[]');
        const userIndex = users.findIndex(u => u.email === user.email);
        if (userIndex !== -1) {
            // Check if new email is already taken
            if (updatedData.email && updatedData.email !== user.email && users.find(u => u.email === updatedData.email)) {
                return { success: false, message: 'Email already in use' };
            }
            users[userIndex] = { ...users[userIndex], ...updatedData };
            localStorage.setItem('vtu_users', JSON.stringify(users));

            const newSessionUser = { ...user, ...updatedData };
            setUser(newSessionUser);
            localStorage.setItem('vtu_user_session', JSON.stringify(newSessionUser));
            return { success: true, message: 'Profile updated successfully' };
        }
        return { success: false, message: 'User not found' };
    };

    const updateSecurity = (currentPassword, newPassword, enable2FA, biometricEnabled, biometricType) => {
        const users = JSON.parse(localStorage.getItem('vtu_users') || '[]');
        const userIndex = users.findIndex(u => u.email === user.email);

        if (userIndex === -1) return { success: false, message: 'User not found' };

        if (currentPassword && newPassword) {
            if (users[userIndex].password !== currentPassword) {
                return { success: false, message: 'Incorrect current password' };
            }
            users[userIndex].password = newPassword;
        }

        const newSessionUser = { ...user };
        
        if (enable2FA !== undefined) {
            users[userIndex].twoFactorEnabled = enable2FA;
            newSessionUser.twoFactorEnabled = enable2FA;
        }
        
        if (biometricEnabled !== undefined) {
            users[userIndex].biometricEnabled = biometricEnabled;
            newSessionUser.biometricEnabled = biometricEnabled;
            if (biometricType) {
                users[userIndex].biometricType = biometricType;
                newSessionUser.biometricType = biometricType;
            }
        }
        
        setUser(newSessionUser);
        localStorage.setItem('vtu_user_session', JSON.stringify(newSessionUser));

        localStorage.setItem('vtu_users', JSON.stringify(users));
        return { success: true, message: 'Security settings updated successfully' };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('vtu_user_session');
    };

    if (loading) return null;

    return (
        <AuthContext.Provider value={{ user, login, loginWithBiometric, signup, logout, updateUser, updateSecurity }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
