import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { theme } from './theme/index.js';
import { ChakraProvider } from '@chakra-ui/react';

import { RouterProvider } from 'react-router-dom';
import router from './router.jsx'; 

import { HelmetProvider } from 'react-helmet-async';

import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </ChakraProvider>
  </StrictMode>,
);