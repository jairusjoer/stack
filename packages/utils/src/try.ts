export const Try = async <Data, Error = unknown>(expression: () => Promise<Data>) => {
  try {
    return { data: await expression(), error: undefined };
  } catch (error) {
    return { data: undefined, error: error as Error };
  }
};
