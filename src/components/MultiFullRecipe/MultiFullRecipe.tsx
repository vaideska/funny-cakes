import { Box, Container, Tab, Tabs } from '@mui/material'
import { SyntheticEvent, useCallback, useEffect, useState } from 'react'
import { FullRecipeContainer } from '../FullRecipe'
import { ResizeObserver } from './ResizeObserver';
import { Recipe } from '../../types/recipeType';
import { typeRecipe } from '../../utils/dictionary';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCreative } from "swiper";
import "swiper/css/effect-creative";
import 'swiper/css';

interface MultiFullRecipeProps {
    duration?: number,
    recipes: Recipe[]
}

export const MultiFullRecipe = ({ recipes, duration = 300 }: MultiFullRecipeProps) => {
    const [value, setValue] = useState(0)
    const [swiper, setSwiper] = useState<any>(null)
    const [swiperLock, setSwiperLock] = useState(false)

    const handleTabChange = (event: SyntheticEvent, targetValue: number) => {
        if (swiperLock) return
        setSwiperLock(true)
        setValue(targetValue)
        swiper.slideTo(targetValue)
    }

    const resizeCb = useCallback(() => {
        if (swiper) {
            swiper.updateAutoHeight()
        }
    }, [swiper])

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <Container>
                <Tabs value={value} onChange={handleTabChange} centered sx={
                    {
                        '& .MuiTabs-indicator': {
                            transition: `left 0.${duration}s ease`,
                        },
                    }
                }>
                    {recipes.map(({ type, id }, index) => (
                        <Tab key={id} label={typeRecipe[type]} value={index} />
                    ))}
                </Tabs>
                <Swiper
                    autoHeight={true}
                    speed={duration}
                    allowTouchMove={false}
                    spaceBetween={50}
                    slidesPerView={1}
                    modules={[EffectCreative]}
                    effect={"creative"}
                    creativeEffect={{
                        prev: {
                            opacity: 0,
                            translate: [0, 0, -800],
                        },
                        next: {
                            translate: ["100%", 0, 0],
                        },
                    }}
                    onSlideChangeTransitionEnd={() => {
                        setSwiperLock(false)
                    }}
                    onSwiper={(swiper) => {
                        setSwiper(swiper)
                    }}
                >
                    {recipes.map(({ id }) => (
                        <SwiperSlide key={id}>
                            <ResizeObserver callback={resizeCb}>
                                <FullRecipeContainer recipeId={id} />
                            </ResizeObserver>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Container>
        </Box>
    )
}
