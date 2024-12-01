export const Try = async <T1, T2 = unknown>(expression: () => Promise<T1>): Promise<[T1?, T2?]> => {
  try {
    return [await expression(), void 0];
  } catch (error) {
    return [void 0, error as T2];
  }
};
