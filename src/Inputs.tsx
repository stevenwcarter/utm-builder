import clsx from 'clsx';
import { DetailedHTMLProps, ForwardedRef, InputHTMLAttributes, forwardRef } from 'react';

export interface SelectProps {
  children: any;
  className?: string;
  onChange?: any;
  value?: any;
  name?: string;
}

export const Select = (props: SelectProps) => {
  const { children, className, ...remainingProps } = props;

  return (
    <select
      className={`w-[90%] mx-2 p-0.5 text-center bg-slate-800 text-lg border border-white outline-none focus:border-green-600 ${className}`}
      {...remainingProps}
    >
      {children}
    </select>
  );
};

export interface InputProps
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {}

export const Input = forwardRef((props: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
  const { className, ...remainingProps } = props;

  const classes = clsx(
    'bg-transparent text-white',
    'mx-2 px-1 py-2',
    'box-border border-gray-400',
    'rounded-lg',
    'border-2',
    'transition-all duration-400',
    'outline-none',
    'focus:outline-0 focus:border-green-600',
    className,
  );

  return <input ref={ref} className={classes} {...remainingProps} />;
});
