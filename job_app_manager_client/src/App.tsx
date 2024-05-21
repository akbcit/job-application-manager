// src/App.tsx
import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routes } from './config/routes.config';
import { AppRoute } from './clientModels/route.model';
import NavBar from './components/NavBar';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './globalStates/authState';
import { CheckAuth } from './components/CheckAuth';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a queryClient
const queryClient = new QueryClient();

const clientId = '474325549248-hqou83qck43h5ol1g2u64jds1lho72ia.apps.googleusercontent.com';

const App: React.FC = () => {

  return (
    <BrowserRouter>
      <AuthProvider>
        <GoogleOAuthProvider clientId={clientId}>
          <QueryClientProvider client={queryClient}>

            <NavBar />
            <CheckAuth>
              <div id="page-outlet">
                <Routes>
                  {routes.map((route: AppRoute, index: number) => (
                    <Route key={index} path={route.path} element={<route.page />} />
                  ))}
                </Routes>
              </div>
            </CheckAuth>
          </QueryClientProvider>
        </GoogleOAuthProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
