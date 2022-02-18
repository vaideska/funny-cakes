import { Stack } from '@mui/material'
import { FullRecipeHero } from './FullRecipeHero'
import { FullRecipeInstruction } from './FullRecipeInstruction'
import { FullRecipeTags } from './FullRecipeTags'


export const FullRecipe = () => {
    return (
        <Stack
            spacing={8} 
            sx={{alignItems: "center", py: 8 }}
        >
            <FullRecipeHero />
            <FullRecipeInstruction />
            <FullRecipeTags />
        </Stack>
    )
}
