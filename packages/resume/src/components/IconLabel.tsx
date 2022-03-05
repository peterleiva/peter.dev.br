import React from 'react';
import type { IconType } from 'react-icons';

type IconLabeledProps = {
  Icon: IconType;
  children: React.ReactNode;
  /**
   * Define the icon color
   */
  iconColor?: string;
};

export default function IconLabel({
  Icon,
  children,
  iconColor: color = '',
}: IconLabeledProps) {
  return (
    <div className="icon flex flex-row flex-nowrap items-center gap-4">
      <Icon color={color} />
      {children}
    </div>
  );
}
