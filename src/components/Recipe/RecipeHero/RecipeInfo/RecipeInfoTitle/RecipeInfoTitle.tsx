import { Typography } from '@mui/material'
import { ReactNode } from 'react'

interface RecipeHeroTitleProps {
    children: ReactNode
}

export const RecipeInfoTitle = ({ children }: RecipeHeroTitleProps) => {
    return (
        <Typography
            component='h1'
            variant='h5'
            align='center'
            sx={{
                pb: 2,
                mx: 'auto'
            }}
        >
            {children}
        </Typography>
    )
}
