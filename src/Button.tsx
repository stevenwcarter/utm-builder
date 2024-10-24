import React from 'react';
import clsx from 'clsx';

export enum ButtonTypes {
  INFO = 'INFO',
  DANGER = 'DANGER',
  WARN = 'WARN',
  PRIMARY = 'PRIMARY',
  SUCCESS = 'SUCCESS',
}

interface ButtonProps {
  type?: ButtonTypes;
  nomargin?: boolean;
  children: any;
  size?: 'sm' | 'lg';
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  block?: boolean;
  title?: string;
  className?: string;
  truetype?: 'button' | 'submit' | 'reset' | undefined;
}

const getVariant = (type?: ButtonTypes) => {
  switch (type) {
    case 'SUCCESS':
      return 'bg-green-700 hover:bg-green-600 text-white';
    case 'DANGER':
      return 'bg-red-700 hover:bg-red-600 text-white';
    case 'INFO':
      return 'bg-blue-700 hover:bg-blue-600 text-white';
    case 'WARN':
      return 'bg-yellow-700 hover:bg-yellow-600 text-white';
    case 'PRIMARY':
    default:
      return 'bg-gray-900 hover:bg-gray-800 text-white';
  }
};

const MyButton = (props: ButtonProps) => {
  const { block, children, nomargin, type, className, truetype, onClick, ...remainingProps } =
    props;

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (onClick) {
      onClick(e);
    }
  };

  const classes = clsx(
    'text-sm',
    'transition',
    'duration-200',
    'ease-in-out',
    'whitespace-nowrap',
    'hover:shadow-lg hover:shadow-slate-500/40',
    nomargin ? 'm-0' : 'm-2',
    'rounded-lg',
    props.size === 'sm' ? 'text-sm py-1 px-2' : 'py-2 px-3',
    block && 'w-full',
    getVariant(type),
    className,
  );

  return (
    <button className={classes} type={truetype} {...remainingProps} onClick={handleClick}>
      {children}
    </button>
  );
};

export default MyButton;
