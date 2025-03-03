import * as LucideIcons from "lucide-react";

interface DynamicIconProps extends LucideIcons.LucideProps {
  iconName: keyof typeof LucideIcons;
}

const DynamicIcon: React.FC<DynamicIconProps> = ({ iconName, ...props }) => {
  // Get the icon component from Lucide
  const Icon = LucideIcons[iconName] as LucideIcons.LucideIcon;

  // Return the icon if it exists, otherwise return null
  return Icon ? <Icon {...props} /> : null;
};

export default DynamicIcon;
