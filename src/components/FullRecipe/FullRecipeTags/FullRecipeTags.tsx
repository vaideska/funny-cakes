import { Chip, Container, Grid } from '@mui/material'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectRecipeById } from '../../../store/slices/recipes/recipesSelectors'
import { MatchParams } from '../../../types/globalTypes'

export const FullRecipeTags = () => {
    const routeParams = useParams<MatchParams>()
    const recipe = useSelector(selectRecipeById(routeParams.id))

    return (
        <Container>
            <Grid container 
                spacing={1} 
                pt={3} 
                justifyContent={'center'}
            >
                {recipe?.tags.map((tag) => (
                    <Grid item key={tag}>
                        <Chip clickable variant="outlined" label={tag}/>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}
