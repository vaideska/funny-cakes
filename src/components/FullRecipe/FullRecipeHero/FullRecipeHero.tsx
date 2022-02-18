import { Container, Grid } from '@mui/material'

import { FullRecipeImg } from './FullRecipeImg'
import { FullRecipeInfo } from './FullRecipeInfo'

export const FullRecipeHero = () => {
    return (
        <Container>
            <Grid container spacing={0} justifyContent="center">
                <Grid item xs={12}>
                    <FullRecipeImg />
                </Grid>
                <Grid item xs={6} sx={{ mt: -13, zIndex: 10 }}>
                    <FullRecipeInfo />
                </Grid>
            </Grid>
        </Container>
    )
}
