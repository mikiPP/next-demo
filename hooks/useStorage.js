/* eslint-disable no-undef */
import { useCallback, useEffect, useState } from 'react';
import { LOCAL_STORAGE } from '../utils/constants';

import { isEmpty } from '../utils/functions';

const useStorage = (key, defaultValue, storage) => {
  const [ value, setValue ] = useState(null);
  const [ storageSelected, setStorageSelected ] = useState(null);


  const getValueFromStorage = () => {
    
    const newStorage = storageSelected || storage === LOCAL_STORAGE ? window.localStorage : window.sessionStorage;

    const valueAsString = newStorage.getItem(key);

    if (!isEmpty(valueAsString)) {
      return JSON.parse(valueAsString);
    }

    if(!storageSelected){
      setStorageSelected(newStorage)
    }

    return 'function' === typeof defaultValue ? defaultValue() : defaultValue;
  }

  useEffect(() => setValue(getValueFromStorage()), [])

  useEffect(() => {
    if(storageSelected) {
      if (!value) {
        storageSelected.removeItem(key);
      } else {
        storageSelected.setItem(key, JSON.stringify(value));
      }
    }
  }, [ key, value, storageSelected ]);

  const remove = useCallback(() => {
    setValue(undefined);
  }, []);

  return [ value, setValue, remove ];
};

export default useStorage;
