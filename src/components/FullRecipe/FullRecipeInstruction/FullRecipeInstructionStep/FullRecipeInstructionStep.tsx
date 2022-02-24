import { Chip, Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'

interface FullRecipeInstructionStepProps {
    children: string,
    index: number
}

export const FullRecipeInstructionStep = ({ children, index }: FullRecipeInstructionStepProps) => {
    return (
        <Box sx={{maxWidth: '640px', width: '100%'}}>
            <Divider sx={{ mb: 2 }}>
                <Chip color='primary' variant='outlined' label={index + 1} sx={{
                    fontSize: '20px',
                    px: 2
                }} />
            </Divider>
            <Typography align='justify'>
                {children}
            </Typography>
        </Box>
    )
}
