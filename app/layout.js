import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AppProvider } from './context/AppContext';
import Header from "./components/Header";
import Sidebaropen from "./components/Sidebaropen";
 import Offlineindication from './components/Offlineindication'; // Import directly
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'A stacking app',
  description: 'Tokenoven the newest running chain',
};

 
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
 
        <AppProvider>
          <Header />
          <Sidebaropen />
          {children}
<ToastContainer/>
          <Offlineindication /> 
        </AppProvider>
       </body>
    </html>
  );
}