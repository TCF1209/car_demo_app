import {
  Droplets,
  Wind,
  Waves,
  CircleDot,
  Battery,
  Wrench,
  Settings,
  Snowflake,
  Circle,
  Sparkles,
  Ticket,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Droplets,
  Wind,
  Waves,
  CircleDot,
  Battery,
  Wrench,
  Settings,
  Snowflake,
  Circle,
  Sparkles,
  Ticket,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] || Wrench;
}
