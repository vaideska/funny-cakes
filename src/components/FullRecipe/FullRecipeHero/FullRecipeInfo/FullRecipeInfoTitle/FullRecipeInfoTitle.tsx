import { Typography } from '@mui/material'
import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectRecipeById } from '../../../../../store/slices/recipes/recipesSelectors'
import { MatchParams } from '../../../../../types/globalTypes'

export const FullRecipeInfoTitle = () => {
    const routeParams = useParams<MatchParams>()
    const recipe = useSelector(selectRecipeById(routeParams.id))
    
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
            {recipe?.title}
        </Typography>
    )
}
