import Header from '@/components/Header/Header';
import { Outlet } from 'react-router-dom';

const GlobalLayout: React.FC = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
export default GlobalLayout;
