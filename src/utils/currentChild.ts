const KEY = "currentChildId";

export const setCurrentChildId = (id: number) => {
  localStorage.setItem(KEY, String(id));
};

export const getCurrentChildId = (): number | null => {
  const value = localStorage.getItem(KEY);
  return value ? Number(value) : null;
};
