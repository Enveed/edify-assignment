import * as LucideIcons from "lucide-react";

export default interface Course {
  name: string;
  currentUnit: string;
  progress: number;
  id: number;
  instructor: string;
  icon: keyof typeof LucideIcons;
}
