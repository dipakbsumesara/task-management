export const objectCopy = (obj: any) => {
  return JSON.parse(JSON.stringify(obj));
};

export const sendApiResponse = (message: string, data: any = null) => {
  return { status: 'success', message, ...(data !== null ? { data } : null) };
};
