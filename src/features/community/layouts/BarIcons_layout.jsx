// src/features/community/layouts/BarIcons_layout.jsx
import React from "react";
import {
    Bell,
    MessageCircle,
    Users
  } from "lucide-react";

export const BarIcons_layout = ({ onIconClick, activeIcon, onSectionChange, activeSection }) => {
  return (
    <div className="w-full md:w-16 bg-gray-200 border-b md:border-b-0 md:border-r border-gray-300 flex md:flex-col items-center justify-around md:justify-start p-2">
      <button 
        className={`p-2 ${activeIcon === "notifications" ? "text-green-600" : "text-gray-800"}`}
        onClick={() => onIconClick && onIconClick("notifications")}
      >
        <Bell className="w-5 h-5" />
      </button>
      <button 
        className={`p-2 ${activeIcon === "messages" ? "text-green-600" : "text-gray-800"}`}
        onClick={() => onIconClick && onIconClick("messages")}
      >
        <MessageCircle className="w-5 h-5" />
      </button>
      <button 
        className={`p-2 ${activeIcon === "users" ? "text-green-600" : "text-gray-800"}`}
        onClick={() => onIconClick && onIconClick("users")}
      >
        <Users className="w-5 h-5" />
      </button>
      <button
        onClick={() => onSectionChange("groups")}
        className={`p-2 ${activeSection === "groups" ? "text-green-600" : "text-gray-800"}`}
      >
        <Users className="w-5 h-5" />
        <span className="text-sm">Grupos</span>
      </button>
    </div>
  );
};
