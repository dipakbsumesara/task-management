export const objectCopy = (obj: any) => {
  return JSON.parse(JSON.stringify(obj));
};

export const sendApiResponse = (message: string, data: any = null) => {
  return { status: 'success', message, ...(data !== null ? { data } : null) };
};

export const formatDate = (isoDate: string) => {
  const formattedDate = new Date(isoDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
  return formattedDate;
};
