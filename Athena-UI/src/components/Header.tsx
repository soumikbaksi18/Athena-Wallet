import React from "react";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div className="p-4 text-center bg-gray-700 text-xl font-bold text-white">
      {title}
    </div>
  );
};

export default Header;
