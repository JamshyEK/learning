import React from "react";

interface CardProps {
  title?: string;
  subtitle?: string;
  description?: string;
  media?: React.ReactNode;
  actions?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  variant?: "default" | "outlined" | "elevated";
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  description,
  media,
  actions,
  footer,
  children,
  className = "",
  variant = "default",
}) => {
  const baseStyles = "rounded-lg overflow-hidden transition-shadow duration-300 text-gray-900";

  const variants = {
    default: "bg-gray-50 shadow-sm border border-gray-200",
    outlined: "bg-white border border-gray-300",
    elevated: "bg-white shadow-md hover:shadow-lg",
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`}>
      {media && <div className="w-full">{media}</div>}

      <div className="px-4 py-3 space-y-2">
        {title && <h3 className="text-lg font-semibold">{title}</h3>}
        {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
        {description && <p className="text-sm text-gray-700">{description}</p>}
        {children}
      </div>

      {actions && (
        <div className="px-4 pb-4 pt-2 flex justify-end flex-wrap gap-2">
          {actions}
        </div>
      )}

      {footer && (
        <div className="px-4 py-2 border-t border-gray-200 text-sm text-gray-500">
          {footer}
        </div>
      )}
    </div>
  );
};
