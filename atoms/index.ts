import { atom, selector } from "recoil";

export const theme = atom<'os' | 'light' | 'dark'>({
  key: "themeState",
  default: "os",
});
