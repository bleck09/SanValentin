import React from 'react'
import { Outlet } from 'react-router-dom'
import './App.css'
import ScrollToTop from '../utils/ScrollToTop';
import { Toaster } from 'react-hot-toast';

const App = () => {
    return (
        <div>
            {/* El componente ScrollToTop se ejecuta en cada cambio de ruta */}
            <ScrollToTop />
            <div className="app-content">
                <Outlet />
                
            </div>
            <Toaster position="top-center" reverseOrder={false} />
        </div>
    )
}

export default App