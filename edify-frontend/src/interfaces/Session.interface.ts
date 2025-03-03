import * as LucideIcons from "lucide-react";

export default interface Session {
  date: string;
  time: string;
  id: number;
  name: string;
  instructor: string;
  icon: keyof typeof LucideIcons;
}
