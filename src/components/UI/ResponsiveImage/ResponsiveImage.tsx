import { Box, SxProps } from '@mui/material';

interface ResponsiveImageProps {
  sx?: SxProps;
  alt?: string;
  aspectRatio?: string; // Соотношение высоты к ширине в процентоном соотношении
  src?: string;
  //Пример ширина === 1000px, если передать значение '65' высота будет равна 65% === 650px
}

export const ResponsiveImage = ({
  src,
  aspectRatio = '40',
  sx,
}: ResponsiveImageProps) => {
  return (
    <Box
      sx={{
        ...sx,
        position: 'relative',
        overflow: 'hidden',
        pb: aspectRatio + '%',
      }}
    >
      {src && (
        <Box
          component="img"
          src={src}
          sx={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      )}
    </Box>
  );
};
