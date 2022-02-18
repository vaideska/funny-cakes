import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';
import { useSelector } from 'react-redux';
import { selectRecipeById } from '../../../store/slices/recipes/recipesSelectors';
import { MatchParams } from '../../../types/globalTypes';
import { RecipeIngredient } from '../../../types/recipeType';
import { FullRecipeInfoIngredients } from '../../../components/FullRecipe/FullRecipeHero/FullRecipeInfo/FullRecipeInfoIngredients'

export const FullRecipeInfoIngredientsContainer = () => {
    const routeParams = useParams<MatchParams>()
    const recipe = useSelector(selectRecipeById(routeParams.id))
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

        if (Number.isNaN(newDiameter)) {
            return
        }

        if (newDiameter > 50) {
            setDiameter(50)
            return
        }

        if (newDiameter < 1) { //TODO: Поправить валидацию. У пользователя должна быть возможность начать ввод с пустой строки
            setDiameter(1)
            return
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
            handleSliderChange={handleSliderChange}
        />
    )
}
