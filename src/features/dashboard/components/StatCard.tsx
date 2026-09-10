import React from "react";
import { Card } from "@heroui/react";
import { LucideIcon } from "lucide-react";

export type StatVariant = "success" | "primary" | "danger" | "default";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  variant?: StatVariant;
}

const variantStyles: Record<StatVariant, { bg: string; iconBg: string; iconColor: string }> = {
  success: {
    bg: "bg-mint/40",
    iconBg: "bg-white",
    iconColor: "text-teal",
  },
  primary: {
    bg: "bg-blue-50",
    iconBg: "bg-white",
    iconColor: "text-blue-500",
  },
  danger: {
    bg: "bg-red-50",
    iconBg: "bg-white",
    iconColor: "text-red-500",
  },
  default: {
    bg: "bg-gray-100",
    iconBg: "bg-white",
    iconColor: "text-gray-500",
  },
};

export const StatCard = ({ title, value, icon: Icon, variant = "default" }: StatCardProps) => {
  const styles = variantStyles[variant];

  return (
    <Card className={`shadow-none border-none rounded-2xl ${styles.bg}`}>
      <Card.Content className="p-6 flex flex-col justify-between min-h-[140px]">
        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${styles.iconBg} shadow-sm`}>
          <Icon size={20} className={styles.iconColor} />
        </div>
        <div>
          <h3 className="text-3xl font-bold text-foreground mt-4">{value}</h3>
          <p className="text-sm text-gray-500 font-medium mt-1">{title}</p>
        </div>
      </Card.Content>
    </Card>
  );
};

