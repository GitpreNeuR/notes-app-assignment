import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <Outlet />
    </div>
  );
};

export default MainLayout;