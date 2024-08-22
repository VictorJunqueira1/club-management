import React from 'react';
import { AppProps } from 'next/app';
import { UserProvider } from '@/context/UserContext';
import "@/app/globals.css"

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
};

export default MyApp;