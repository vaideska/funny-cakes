export const getTime = (mSeconds = 0) => {
  const dateFormater = (dateElement: number) => {
    return dateElement >= 10 ? dateElement : '0' + dateElement;
  };

  const date = new Date(mSeconds);
  const day = dateFormater(date.getDay());
  const month = dateFormater(date.getMonth());
  const year = dateFormater(date.getFullYear());

  return `${day}.${month}.${year}`;
};

export const recipeTypeToUnit = (type: string) => {
  switch (type) {
    case 'cream':
      return 'volume';
    case 'surface':
      return 'volume';
    case 'biscuit':
      return 'diameter';
    case 'full recipe':
      return 'diameter';
  }
};
