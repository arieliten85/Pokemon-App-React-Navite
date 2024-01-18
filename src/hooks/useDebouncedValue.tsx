import {useEffect, useState} from 'react';

export const useDebouncedValue = (input: string = '', time: number = 500) => {
  const [value, setValue] = useState(input);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setValue(input);
    }, time);

    return () => {
      clearTimeout(timeout);
    };
  }, [input]);

  return value;
};
