import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 p-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
      
      {/* Right side - Background Image */}
      <div className="hidden lg:block w-1/2  bg-cover  bg-center" 
        style={{
          backgroundImage: 'url(/bgImage.jpg)',
          clipPath: "polygon(48% 0, 100% 0, 100% 100%, 0% 100%)"
          // Replace with your actual image URL in production
        }}>
      </div>
    </div>
  );
};

export default AuthLayout;