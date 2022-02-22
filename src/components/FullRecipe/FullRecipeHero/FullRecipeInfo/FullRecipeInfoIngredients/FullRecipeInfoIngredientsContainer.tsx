import { ChangeEvent, FocusEvent, SyntheticEvent, useEffect, useState } from "react";
import { useDebouncedCallback } from 'use-debounce';
import { Recipe, RecipeIngredient } from '../../../../../types/recipeType';
import { FullRecipeInfoIngredients } from '.'
import { recipeTypeToUnit } from '../../../../../utils/functions';

interface FullRecipeInfoIngredientsContainerProps {
    recipe: Recipe
}

export const FullRecipeInfoIngredientsContainer = ({ recipe }: FullRecipeInfoIngredientsContainerProps) => {
    const [diameter, setDiameter] = useState<number | number[]>(0)
    const [customIngredients, setCustomIngredients] = useState<RecipeIngredient[] | undefined>()

    useEffect(() => {
        if (recipe) {
            setDiameter(Number(recipe.diameter))
            setCustomIngredients(recipe.ingredients)
        }
    }, [recipe])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const prevDiameter = Number(recipe?.diameter)
        const newDiameter = Number(e.target.value)
        const recipeCalcUnit = recipeTypeToUnit(recipe.type)

        if (Number.isNaN(newDiameter)) {
            return
        }

        if(recipeCalcUnit === 'volume') {
            if(newDiameter > 5000) return setDiameter(5000)
        } else {
            if(newDiameter > 50) return setDiameter(50)
        }

        setDiameter(newDiameter)
        calcIngredients(prevDiameter, newDiameter)
    }

    const handleInputBlur = (e: FocusEvent<HTMLInputElement>) => {
        const prevDiameter = Number(recipe?.diameter)
        const newDiameter = Number(e.target.value)
        const recipeCalcUnit = recipeTypeToUnit(recipe.type)

        if (Number.isNaN(newDiameter)) {
            return
        }

        if(recipeCalcUnit === 'volume') {
            if(newDiameter < 100) return setDiameter(100)
        } else {
            if(newDiameter < 1) return setDiameter(1)
        }

        setDiameter(newDiameter)
        calcIngredients(prevDiameter, newDiameter)
    }

    const handleSliderChange = (event: Event | SyntheticEvent, value: number | number[]) => {
        const baseDiameter = Number(recipe?.diameter)
        const newDiameter = Number(value)
        setDiameter(value)
        calcIngredients(baseDiameter, newDiameter)
    }

    const calcIngredients = useDebouncedCallback((baseDiameter: number, newDiametr: number) => {
        let factor: number = newDiametr / baseDiameter

        setCustomIngredients((prevIngredients) => {
            if (prevIngredients) {
                return recipe?.ingredients.map((ingredient) => {
                    return {
                        ...ingredient,
                        count: Number((ingredient.count * factor).toFixed(2)),
                    }
                })
            }
        })
        console.log(factor);
    }, 300)

    return (
        <FullRecipeInfoIngredients 
            customIngredients={customIngredients}   
            diameter={diameter}
            handleInputChange={handleInputChange}
            handleInputBlur={handleInputBlur}
            handleSliderChange={handleSliderChange}
            recipe={recipe as Recipe}
        />
    )
}
