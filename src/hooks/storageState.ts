/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useCallback, useMemo, useState } from 'react';

interface IStorageStateData {
  initialValue: any;
  labelStorage: string;
}

export function useStorageState<T>({
  initialValue,
  labelStorage,
}: IStorageStateData): [T, (data: T) => void, (labelStored: string) => void] {
  const [storage, setStorage] = useState<T>(() => {
    const storedValue = localStorage.getItem(labelStorage);

    if (storedValue) return JSON.parse(storedValue);

    return initialValue;
  });

  const setStorageCallback = useCallback(
    (data: T) => {
      const parsedData = JSON.stringify(data);

      localStorage.setItem(labelStorage, parsedData);

      setStorage(data);
    },
    [labelStorage],
  );

  const removeStorage = useCallback((labelStored: string) => {
    localStorage.removeItem(labelStored);

    const newValue: unknown = null;

    setStorage(newValue as T);
  }, []);

  const storageValues: [T, (data: T) => void, (labelStored: string) => void] =
    useMemo(
      () => [storage, setStorageCallback, removeStorage],
      [removeStorage, storage, setStorageCallback],
    );

  return storageValues;
}
