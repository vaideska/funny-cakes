import { Container, Grid } from '@mui/material'

import { RecipeImg } from './RecipeImg'
import { RecipeInfo } from './RecipeInfo'

export const RecipeHero = () => {
    return (
        <Container>
            <Grid container spacing={0} justifyContent="center">
                <Grid item xs={12}>
                    <RecipeImg />
                </Grid>
                <Grid item xs={6} sx={{ mt: -13, zIndex: 10 }}>
                    <RecipeInfo />
                </Grid>
            </Grid>
        </Container>
    )
}
