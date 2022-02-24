import { Box, Container, Tab, Tabs } from '@mui/material';
import { Dispatch, SetStateAction, SyntheticEvent } from 'react';
import { FullRecipeContainer } from '../FullRecipe';
import { ResizeObserver } from './ResizeObserver';
import { Recipe } from '../../types/recipeType';
import { typeRecipe } from '../../utils/dictionary';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCreative } from 'swiper';
import 'swiper/css/effect-creative';
import 'swiper/css';
import SwiperClass from 'swiper/types/swiper-class';

interface MultiFullRecipeProps {
  recipes: Recipe[];
  animateDuration?: number;

  setSwiperInstance: Dispatch<SetStateAction<SwiperClass | null>>;
  setSwiperLock: Dispatch<SetStateAction<boolean>>;
  tabControllerVal: number;
  handleTabChange: (event: SyntheticEvent, targetValue: number) => void;
  resizeObserverCb: () => void;
}

export const MultiFullRecipe = ({
  recipes,
  animateDuration = 300,

  tabControllerVal,
  setSwiperInstance,
  setSwiperLock,
  handleTabChange,
  resizeObserverCb,
}: MultiFullRecipeProps) => {
  return (
    <Box sx={{ pb: 2 }}>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          px: { xs: 0 },
        }}
      >
        <Tabs
          value={tabControllerVal}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          sx={{
            '& .MuiTabs-indicator': {
              transition: `left 0.${animateDuration}s ease`,
            },
            mb: { xs: 3, sm: 0 },
          }}
        >
          {recipes.map(({ type, id }, index) => (
            <Tab
              key={id}
              label={typeRecipe[type]}
              value={index}
              sx={{
                pt: { xs: 1.5, sm: 3.2 },
                pb: { xs: 1.5, sm: 2.5 },
                fontSize: { xs: '13px', sm: '16px' },
              }}
            />
          ))}
        </Tabs>
      </Container>
      <Swiper
        autoHeight={true}
        speed={animateDuration}
        allowTouchMove={false}
        spaceBetween={50}
        slidesPerView={1}
        modules={[EffectCreative]}
        effect={'creative'}
        creativeEffect={{
          prev: {
            opacity: 0,
            translate: [0, 0, -800],
          },
          next: {
            translate: ['100%', 0, 0],
          },
        }}
        onSlideChangeTransitionEnd={() => {
          setSwiperLock(false);
        }}
        onSwiper={(swiper) => {
          setSwiperInstance(swiper);
        }}
      >
        {recipes.map(({ id }) => (
          <SwiperSlide key={id}>
            <ResizeObserver callback={resizeObserverCb}>
              <FullRecipeContainer recipeId={id} />
            </ResizeObserver>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};
