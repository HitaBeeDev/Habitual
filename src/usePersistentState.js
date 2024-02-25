import { useEffect, useState } from "react";

export default function usePersistantState(key, initialValue) {
  const [state, setState] = useState(() => {
    const storedState = localStorage.getItem(key);
    return storedState ? JSON.parse(storedState) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
