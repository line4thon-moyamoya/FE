import { MOYA_LOOKS, type MoyaLook } from "../types/moya";

const KEY = "currentMoyaLook";

export const setCurrentLook = (look: MoyaLook) => {
  localStorage.setItem(KEY, look);
};

export const getCurrentLook = (): MoyaLook => {
  const value = localStorage.getItem(KEY);
  return MOYA_LOOKS.includes(value as MoyaLook) ? (value as MoyaLook) : "default";
};
