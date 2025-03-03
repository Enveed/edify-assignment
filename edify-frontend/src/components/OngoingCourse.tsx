import React from "react";
import * as LucideIcons from "lucide-react";
import DynamicIcon from "./DynamicIcon";

interface CourseProps {
  title: string;
  unit: string;
  icon: keyof typeof LucideIcons;
  progress?: number;
}

const OngoingCourse: React.FC<CourseProps> = ({
  title,
  unit,
  icon,
  progress,
}) => {
  return (
    <div className="bg-[#EAEAEA] rounded-lg p-4 shadow-sm">
      <div className="flex gap-3 mb-4">
        <DynamicIcon iconName={icon} className="w-6 h-6 text-black mt-1" />
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-gray-600 text-sm mb-4">{unit}</p>
        </div>
      </div>
      <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full bg-[#0FB5EB]`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default OngoingCourse;
