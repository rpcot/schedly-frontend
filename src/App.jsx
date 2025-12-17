import { Outlet } from 'react-router-dom';
import NavBar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <NavBar />

      <Outlet />
    </>
  );
}