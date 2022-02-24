interface Map {
  [index: string]: string;
}

export const unitList: Map = {
  gr: 'гр',
  ml: 'мл',
  cups: 'стак.',
  tablespoon: 'ст. л.',
  'tea spoon': 'ч. л.',
  count: 'шт.',
};

export const tagList: Map = {
  chocolate: 'шоколадный',
  vanilla: 'ванильный',
  yogurt: 'йогуртовый',
  PP: 'ПП',
  pancake: 'блинный',
  cheesecake: 'чизкейк',
  sugarFree: 'без сахара',
  vegan: 'веган',
  light: 'легкий',
  shortbread: 'песочный',
  classic: 'классический',
};

export const typeRecipe: Map = {
  'full recipe': 'Полный рецепт',
  cream: 'Крем',
  biscuit: 'Бисквит',
  surface: 'Поверхность торта',
};
