import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { selectRecipes } from '../../store/slices/recipes/recipesSelectors';
import { FullRecipe } from '.'
import { MatchParams } from '../../types/globalTypes';
import { useFirebase } from '../../hooks/useFirebase';
import { PageLoader } from '../UI/PageLoader';

interface FullRecipeContainerProps {
    recipeId?: string
}

export const FullRecipeContainer = ({ recipeId }: FullRecipeContainerProps) => {
    const [loading, setLoading] = useState(true)
    const { getRecipeById } = useFirebase()
    const routeParams = useParams<MatchParams>()
    const recipesStoreIsEmpty = !Boolean(useSelector(selectRecipes).recipes.length)

    useEffect(() => {
        if (recipeId || routeParams.id) {
            if (recipesStoreIsEmpty) {
                getRecipeById(recipeId || routeParams.id)
                .then((res) => {
                    setLoading(false)
                })
            } else {
                setLoading(false)
            }
        } else {
            console.log('РЕЦЕПТ НЕ НАЙДЕН');
            // здесь сделаем редирект на 404
        }
    }, []);

    return (
        loading ?
        <PageLoader />
        :
        <FullRecipe />
    )
}
