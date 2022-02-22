import { SyntheticEvent, useCallback, useState } from 'react'
import SwiperClass from 'swiper/types/swiper-class';
import { MultiFullRecipe } from '.';
import { Recipe } from '../../types/recipeType';

interface MultiFullRecipeContainerProps {
    recipes: Recipe[],
    animateDuration?: number
}

export const MultiFullRecipeContainer = ({ recipes, animateDuration }: MultiFullRecipeContainerProps) => {
    const [tabControllerVal, setTabControllerVal] = useState(0)
    const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(null)
    const [swiperLock, setSwiperLock] = useState(false)

    const handleTabChange = (event: SyntheticEvent, targetValue: number) => {
        if (swiperLock) return
        setSwiperLock(true)
        setTabControllerVal(targetValue)
        swiperInstance?.slideTo(targetValue)
    }

    const resizeObserverCb = useCallback(() => {
        if (swiperInstance) {
            swiperInstance.updateAutoHeight()
        }
    }, [swiperInstance])

    return (
        <MultiFullRecipe
            recipes={recipes} 
            animateDuration={animateDuration}
            
            setSwiperInstance={setSwiperInstance}
            setSwiperLock={setSwiperLock}
            tabControllerVal={tabControllerVal}
            handleTabChange={handleTabChange}
            resizeObserverCb={resizeObserverCb}
        />
    )
}
