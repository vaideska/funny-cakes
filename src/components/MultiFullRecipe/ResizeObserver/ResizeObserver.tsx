import { Box } from '@mui/system';
import { ReactElement } from 'react';
import useResizeObserver from 'use-resize-observer';

export interface ResizeObserverSize {
  width?: number;
  height?: number;
}

export interface ResizeObserverProps {
  callback: (size: ResizeObserverSize) => void;
  children: ReactElement;
}

export const ResizeObserver = ({ callback, children }: ResizeObserverProps) => {
  const { ref } = useResizeObserver<HTMLDivElement>({
    onResize: callback,
  });

  return <Box ref={ref}>{children}</Box>;
};
