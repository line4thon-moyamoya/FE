import type { ChildErrorType } from "../types/child";

const ERROR_TYPES: ChildErrorType[] = ["connection", "micPermission"];

/**
 * 테스트용: /home?error=connection, /home?error=micPermission
 * 개발 모드에서만 동작
 */
export const getDebugError = (): ChildErrorType | null => {
  if (!import.meta.env.DEV) return null;
  const value = new URLSearchParams(window.location.search).get("error");
  return ERROR_TYPES.includes(value as ChildErrorType)
    ? (value as ChildErrorType)
    : null;
};