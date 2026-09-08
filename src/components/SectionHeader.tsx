import React from 'react';

interface SectionHeaderProps {
  badge: string;
  badgeIcon?: React.ReactNode;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  badgeColor?: 'primary' | 'secondary' | 'tertiary';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  badgeIcon,
  title,
  description,
  align = 'left',
  badgeColor = 'primary',
  className = ''
}) => {
  const colorClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    tertiary: 'text-tertiary'
  }[badgeColor];

  return (
    <div
      className={`flex flex-col mb-10 ${
        align === 'center' ? 'items-center text-center' : 'items-start text-left'
      } ${className}`}
    >
      <div
        className={`font-mono text-xs uppercase tracking-widest mb-1.5 flex items-center gap-2 ${colorClasses}`}
      >
        {badgeIcon}
        <span>{badge}</span>
      </div>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-on-surface font-sans tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="text-sm sm:text-base text-on-surface-variant max-w-3xl mt-2 font-sans leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};
