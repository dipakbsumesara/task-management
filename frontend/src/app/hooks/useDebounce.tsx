import { useEffect, useState } from 'react';
import { debounce } from 'lodash';

type Props = {
  value: any;
  delay: number;
};

const useDebounce = ({ value, delay }: Props) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = debounce(() => {
      setDebouncedValue(value);
    }, delay);

    handler();

    return () => {
      handler.cancel();
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
