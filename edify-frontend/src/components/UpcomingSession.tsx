import React from "react";
import * as LucideIcons from "lucide-react";
import DynamicIcon from "./DynamicIcon";

interface SessionProps {
  icon: keyof typeof LucideIcons;
  title: string;
  tutor: string;
  date: string;
  time: string;
}

const bgColors = ["bg-[#1482CB]", "bg-[#CE5E5E]"];

const UpcomingSession: React.FC<SessionProps> = ({
  icon,
  title,
  tutor,
  date,
  time,
}) => {
  const bgColor = bgColors[Math.floor(Math.random() * bgColors.length)];

  return (
    <div className="flex gap-4 p-4 bg-white rounded-lg shadow-sm">
      <div>
        <div className={`p-2 rounded-3xl ${bgColor} mt-1`}>
          <DynamicIcon iconName={icon} className={`w-5 h-5 text-white`} />
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-1">
        <p className="text-sm text-gray-600">Session</p>
        <h4 className="font-medium text-gray-900">
          {title} - {tutor}
        </h4>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <DynamicIcon iconName="Calendar" className="w-4 h-4" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-1  text-sm text-gray-500">
          <DynamicIcon iconName="Clock" className="w-4 h-4" />
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
};

export default UpcomingSession;
