import { RecipeHero } from './RecipeHero'
import { Stack } from '@mui/material'
import { RecipeInstruction } from './RecipeInstruction'
import { RecipeTags } from './RecipeTags'

export const Recipe = () => {
    return (
        <Stack
            spacing={8} 
            sx={{alignItems: "center", py: 8 }}
        >
            <RecipeHero />
            <RecipeInstruction />
            <RecipeTags />
        </Stack>
    )
}
