import React from "react";
import { X } from "lucide-react";
import UpcomingSession from "./UpcomingSession";
import Session from "../interfaces/Session.interface";

interface RightSidebarProps {
  onClose: () => void;
  upcomingSessions: Session[];
}

const RightSidebar: React.FC<RightSidebarProps> = ({
  onClose,
  upcomingSessions,
}) => {
  const today = new Date();

  return (
    <div className="bg-[#EAEAEA] h-full">
      <div className="flex items-center justify-between p-4 mb-4 border-b border-[#D5D2D2]">
        <div>
          <p className="text-base font-medium">
            {today.toLocaleDateString("en-US", { weekday: "long" })}
          </p>
          <p className="text-sm text-gray-500">
            {today.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            title="close-notification-button"
            type="button"
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=faces"
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover"
          />
        </div>
      </div>

      <div className="px-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Upcoming sessions
        </h2>
        <div className="space-y-3">
          {upcomingSessions.length > 0 &&
            upcomingSessions.map((session) => (
              <UpcomingSession
                icon={session.icon}
                title={session.name}
                tutor={session.instructor}
                date={new Date(session.date).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
                time={session.time}
                key={session.id}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
