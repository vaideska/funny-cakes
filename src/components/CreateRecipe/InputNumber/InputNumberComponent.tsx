import { Box } from '@mui/material';
import React from 'react';

export const InputNumberComponent = React.forwardRef(
  function InputNumberComponent(props: {}, ref) {
    return <Box component="input" ref={ref} type="number" {...props} />;
  }
);
