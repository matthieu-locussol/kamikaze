import { CssBaseline, ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Layout } from './components/Layout.tsx';
import { StoreProvider } from './store/index.tsx';
import { theme } from './styles/theme.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
   <React.StrictMode>
      <StoreProvider>
         <ThemeProvider theme={theme}>
            <SnackbarProvider maxSnack={1}>
               <CssBaseline />
               <Layout>
                  <App />
               </Layout>
            </SnackbarProvider>
         </ThemeProvider>
      </StoreProvider>
   </React.StrictMode>,
);
