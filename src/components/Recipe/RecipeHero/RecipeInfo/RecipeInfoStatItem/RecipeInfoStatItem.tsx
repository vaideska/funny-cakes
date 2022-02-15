import { Box, SvgIcon, Typography } from '@mui/material'
import { ReactNode } from 'react'

interface RecipeHeroInfoItemProps {
    icon: ReactNode,
    txt: string
}

export const RecipeInfoStatItem = ({ icon, txt }: RecipeHeroInfoItemProps) => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center'
            }}
        >
            <SvgIcon
                fontSize='large'
                children={icon}
                sx={{ mr: 1 }}
            />
            <Typography
                children={txt}
                sx={{ fontSize: 18 }}
            />
        </Box>
    )
}
