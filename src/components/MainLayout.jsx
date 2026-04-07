import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';

const MainLayout = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '480px', margin: '0 auto', minHeight: '100vh', position: 'relative', paddingBottom: '80px' }}>
            <Outlet />
            <BottomNav />
        </div>
    );
};
export default MainLayout;
