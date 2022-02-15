import { Chip, Container, Grid } from '@mui/material'
import { tagList } from '../../../utils/dictionary'

export const RecipeTags = () => {
    return (
        <Container>
            <Grid container 
                spacing={1} 
                pt={3} 
                justifyContent={'center'}
            >
                {Object.values(tagList).map((tag, index) => (
                    <Grid item key={index}>
                        <Chip clickable variant="outlined" label={tag}/>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}
