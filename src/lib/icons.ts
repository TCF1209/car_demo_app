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
  Shield,
  ShieldCheck,
  Crown,
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
  Shield,
  ShieldCheck,
  Crown,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] || Wrench;
}
