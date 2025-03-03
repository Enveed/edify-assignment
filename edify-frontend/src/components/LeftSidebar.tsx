import React from "react";
import { X, House, LogOut } from "lucide-react";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

interface LeftSidebarProps {
  onClose: () => void;
  handleLogout: () => void;
}

const NavItem: React.FC<NavItemProps> = ({
  icon,
  label,
  isActive,
  onClick,
}) => {
  const baseClasses = `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors w-full cursor-pointer
    ${
      isActive ? "bg-[#19b5ea] text-white" : "text-gray-600 hover:bg-gray-100"
    }`;

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={baseClasses}>
        {icon}
        <span className="font-medium">{label}</span>
      </button>
    );
  }

  return (
    <a href="#" className={baseClasses}>
      {icon}
      <span className="font-medium">{label}</span>
    </a>
  );
};

const LeftSidebar: React.FC<LeftSidebarProps> = ({ onClose, handleLogout }) => {
  return (
    <div className="bg-[#E0E0E0] h-full flex flex-col">
      <div className="mb-4 flex items-center justify-between p-4 border-b border-[#D5D2D2]">
        <h1 className="text-3xl font-bold px-4">
          <span className="text-[#48515f]">edify</span>
          <span className="text-[#19b5ea]">ello</span>
        </h1>

        <button
          title="close-menu-button"
          type="button"
          onClick={onClose}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 space-y-1 px-4">
        <NavItem
          icon={<House className="w-5 h-5" />}
          label="Dashboard"
          isActive
        />
      </nav>

      <div className="border-t border-[#D5D2D2] space-y-1 p-4">
        <NavItem
          icon={<LogOut className="w-5 h-5" />}
          label="Logout"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default LeftSidebar;
