import { ForwardedRef, forwardRef } from 'react';
import { Input } from './Inputs';

export const Parameter = forwardRef((props: any, ref: ForwardedRef<HTMLInputElement>) => {
  const { name, value, setter } = props;

  return (
    <div ref={ref} className="flex">
      <span className="w-20 md:w-32 lg:w-48 self-center text-right">{name}</span>
      <Input
        className="w-[180px] sm:w-[220px] md:w-[420px] lg:w-[550px]"
        value={value}
        onChange={(e) => setter(e.target.value)}
      />
    </div>
  );
});
