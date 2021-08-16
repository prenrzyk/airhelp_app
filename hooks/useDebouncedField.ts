import debounce from 'lodash/debounce';
import { useCallback, useState } from 'react';

export type DebouncedField = [
  value: string,
  debounced: string,
  setValue: (v: string) => void,
];

const useDebouncedField = (initial = '') => {
  const [value, setValue] = useState(initial);
  const [debounced, setDebounced] = useState(initial);

  const debouncedCb = useCallback(debounce(setDebounced, 800), []);
  const setValueDebounced = useCallback((v: string) => {
    setValue(v);
    debouncedCb(v);
  }, []);
  return [value, debounced, setValueDebounced] as DebouncedField;
};

export default useDebouncedField;
