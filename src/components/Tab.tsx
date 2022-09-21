import React from 'react';
import { Cancel } from 'iconoir-react';

interface TabProps {
  title: string;
  isActive: boolean;
  onClick(): void;
  onDoubleClick(): void;
  onRemove(): void;
}

const Tab: React.FC<TabProps> = ({
  title,
  isActive,
  onClick,
  onDoubleClick,
  onRemove,
}) => {
  const initial = [
    'font-mono',
    'text-xs',
    'select-none',
    'border-t',
    'border-r',
    'border-r-gray-400',
    'px-8',
    'py-2',
    'relative',
    'flex',
    'items-center',
  ];
  const inactive = [...initial, 'border-t-gray-400', 'bg-neutral-300'].join(
    ' '
  );
  const active = [
    ...initial,
    'border-t-4',
    'border-t-orange-400',
    'pt-1',
    'bg-white',
  ].join(' ');

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove();
  };

  return (
    <div
      className={isActive ? active : inactive}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      <span>{title}</span>
      {isActive && (
        <span
          className="cursor-pointer absolute right-2"
          onClick={handleRemove}
        >
          <Cancel fontSize={10} strokeWidth={2} color="grey" />
        </span>
      )}
    </div>
  );
};

export default Tab;
