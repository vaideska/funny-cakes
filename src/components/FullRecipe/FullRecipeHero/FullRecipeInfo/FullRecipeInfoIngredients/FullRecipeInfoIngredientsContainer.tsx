import {
  ChangeEvent,
  FocusEvent,
  SyntheticEvent,
  useEffect,
  useState,
} from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { FullRecipeInfoIngredients } from '.';
import { Recipe, RecipeIngredient } from '../../../../../types/recipeType';
import { recipeTypeToUnit } from '../../../../../utils/functions';

interface FullRecipeInfoIngredientsContainerProps {
  recipe: Recipe;
}

export const FullRecipeInfoIngredientsContainer = ({
  recipe,
}: FullRecipeInfoIngredientsContainerProps) => {
  const [diameter, setDiameter] = useState<number | number[]>(0);
  const [customIngredients, setCustomIngredients] = useState<
    RecipeIngredient[] | undefined
  >();

  useEffect(() => {
    if (recipe) {
      setDiameter(Number(recipe.diameter))
      setCustomIngredients(recipe.ingredients)
    }
  }, [recipe])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const baseUnitValue = Number(recipe?.diameter)
    let newUnitValue = Number(e.target.value)
    const recipeCalcUnit = recipeTypeToUnit(recipe.type)

    if (Number.isNaN(newUnitValue)) {
      return
    }

    if (recipeCalcUnit === 'volume') {
      if (newUnitValue > 5000) {
        newUnitValue = 5000
      }
    } else {
      if (newUnitValue > 50) {
        newUnitValue = 50
      }
    }

    setDiameter(newUnitValue)
    calcIngredients(baseUnitValue, newUnitValue)
  }

  const handleInputBlur = (e: FocusEvent<HTMLInputElement>) => {
    const baseUnitValue = Number(recipe?.diameter)
    let newUnitValue = Number(e.target.value)
    const recipeCalcUnit = recipeTypeToUnit(recipe.type)

    if (Number.isNaN(newUnitValue)) {
      return
    }

    if (recipeCalcUnit === 'volume') {
      if (newUnitValue < 100) {
        newUnitValue = 100
      }
    } else {
      if (newUnitValue < 1) {
        newUnitValue = 1
      }
    }

    setDiameter(newUnitValue)
    calcIngredients(baseUnitValue, newUnitValue)
  }

const handleSliderChange = (
  event: Event | SyntheticEvent,
  value: number | number[]
) => {
  const baseUnitValue = Number(recipe?.diameter);
  const newUnitValue = Number(value);
  setDiameter(value);
  calcIngredients(baseUnitValue, newUnitValue);
};

const calcIngredients = useDebouncedCallback(
  (baseDiameter: number, newDiametr: number) => {
    let factor: number = Math.pow(newDiametr, 2) / Math.pow(baseDiameter, 2);


    setCustomIngredients((prevIngredients) => {
      if (prevIngredients) {
        return recipe?.ingredients.map((ingredient) => {
          return {
            ...ingredient,
            count: Number((ingredient.count * factor).toFixed(2)),
          };
        });
      }
    });
    console.log(factor);
  },
  300
);

return (
  <FullRecipeInfoIngredients
    customIngredients={customIngredients}
    diameter={diameter}
    handleInputChange={handleInputChange}
    handleInputBlur={handleInputBlur}
    handleSliderChange={handleSliderChange}
    recipe={recipe as Recipe}
  />
);
};
