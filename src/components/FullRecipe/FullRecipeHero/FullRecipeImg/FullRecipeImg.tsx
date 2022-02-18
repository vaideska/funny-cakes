import { Paper } from '@mui/material'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectRecipeById } from '../../../../store/slices/recipes/recipesSelectors'
import { MatchParams } from '../../../../types/globalTypes'
import { ResponsiveImage } from '../../../UI/ResponsiveImage'

export const FullRecipeImg = () => {
    const routeParams = useParams<MatchParams>()
    const recipe = useSelector(selectRecipeById(routeParams.id))

    return (
        <Paper
            elevation={12}
            sx={{
                borderRadius: 3,
                overflow: 'hidden',
            }}
        >
            <ResponsiveImage
                src={recipe?.imgUrl}
                alt='тортик'
            />
        </Paper>
    )
}
