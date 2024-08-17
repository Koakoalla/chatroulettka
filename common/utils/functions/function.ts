export const shuffle = <T>(array: T[]): T[] => {
  const tempArr = [...array];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [tempArr[i], tempArr[j]] = [tempArr[j], tempArr[i]];
  }
  return tempArr;
};

export const getTime = (): string => {
  const date = new Date();

  const minute = date.getMinutes();
  const minuteS = `${minute < 10 ? '0' : ''}${minute}`;

  const hour = date.getHours();
  const hourS = `${hour < 10 ? '0' : ''}${hour}`;

  const time = `${hourS}:${minuteS}`;
  return time;
};
