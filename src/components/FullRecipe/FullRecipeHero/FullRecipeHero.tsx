import { Container, Grid } from '@mui/material'
import { ReactElement } from 'react'

interface FullRecipeHeroProps {
    img: ReactElement,
    info: ReactElement
}

export const FullRecipeHero = ({ img, info }: FullRecipeHeroProps) => {
    return (
        <Container>
            <Grid container spacing={0} justifyContent="center">
                <Grid item xs={12}>
                    {img}
                </Grid>
                <Grid item xs={6} sx={{ mt: -13, zIndex: 10 }}>
                    {info}
                </Grid>
            </Grid>
        </Container>
    )
}
