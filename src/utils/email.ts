/**
 * 이메일 형식 검사.
 * 서버와 같은 수준으로만 거른다. 공백 없이 @ 하나, 점이 있는 도메인.
 */
export const isValidEmail = (value: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
