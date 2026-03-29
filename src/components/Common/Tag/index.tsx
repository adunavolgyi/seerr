import { TagIcon } from '@heroicons/react/24/outline';
import React from 'react';

type TagProps = {
  children: React.ReactNode;
  iconSvg?: JSX.Element;
};

const Tag = ({ children, iconSvg }: TagProps) => {
  return (
    <div className="inline-flex cursor-pointer items-center rounded-full bg-background-secondary px-2 py-1 text-sm text-text-primary ring-1 ring-border-dark transition hover:bg-surface">
      {iconSvg ? (
        React.cloneElement(iconSvg, {
          className: 'mr-1 h-4 w-4',
        })
      ) : (
        <TagIcon className="mr-1 h-4 w-4" />
      )}
      <span>{children}</span>
    </div>
  );
};

export default Tag;
