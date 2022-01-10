
import { createContext, useContext } from 'react';

export const MainContext = createContext();

export function useMain() {
  return useContext(MainContext);
}