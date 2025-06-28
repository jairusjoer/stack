export const Try = async <T1, T2 = unknown>(expression: () => Promise<T1>): Promise<{ data?: T1; error?: T2 }> => {
  try {
    return { data: await expression(), error: void 0 };
  } catch (error) {
    return { data: void 0, error: error as T2 };
  }
};
