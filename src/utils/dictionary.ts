interface Map {
  [index: string]: string;
}

export const unitList: Map = {
  gr: 'гр',
  ml: 'мл',
  cups: 'стак.',
  tablespoon: 'ст. л.',
  'tea spoon': 'ч. л.',
};

export const tagList: Map = {
  'vanilla cream': 'Ванильный крем',
  'chocolate cream': 'Шоколадный крем',
  'red velvet': 'Красный бархат',
  glaze: 'Глазурь',
  mastic: 'Мастика',
  'vanilla cake': 'Ванильный корж',
};

export const typeRecipe: Map = {
  'full recipe': 'Полный рецепт',
  cream: 'Крем',
  biscuit: 'Бисквит',
  surface: 'Поверхность торта',
};
