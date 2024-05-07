export const TASK_COLORS = {
  TO_DO: '#FFD700',
  DONE: '#4CAF50',
  IN_PROGRESS: '#2196F3',
};

export const getTaskColorCode = (status: string) => {
    const transformedStatus: any = status.toUpperCase().replace(" ", "_");
    // @ts-ignore
    return transformedStatus in TASK_COLORS ? TASK_COLORS[transformedStatus] : "";
};