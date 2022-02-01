import React from 'react';
import type { IconType } from 'react-icons';

type IconLabeledProps = {
  Icon: IconType;
  children: React.ReactNode;
  color?: string;
};

export default function IconLabel({
  Icon,
  children,
  color = '',
}: IconLabeledProps) {
  return (
    <div className="icon">
      <Icon />
      {children}

      <style jsx>{`
        .icon {
          display: flex;
          flex: row nowrap;
          align-items: center;
          gap: var(--space-sm);
          color: ${color};
        }
      `}</style>
    </div>
  );
}
