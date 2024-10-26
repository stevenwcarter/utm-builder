import { ForwardedRef, forwardRef } from 'react';
import { Input } from './Inputs';

export const Parameter = forwardRef((props: any, ref: ForwardedRef<HTMLInputElement>) => {
  const { name, value, setter } = props;

  return (
    <div ref={ref} className="flex">
      <span className="w-20 md:w-48 lg:w-80 self-center text-right">{name}</span>
      <Input
        className="w-[180px] xs:w-[250px] sm:w-[350px] md:w-[450px] lg:w-[550px]"
        value={value}
        onChange={(e) => setter(e.target.value)}
      />
    </div>
  );
});
