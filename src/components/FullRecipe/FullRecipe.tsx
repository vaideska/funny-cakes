import { Stack } from '@mui/material'
import { FullRecipeHero } from './FullRecipeHero'
import { FullRecipeInstruction } from './FullRecipeInstruction'
import { FullRecipeTags } from './FullRecipeTags'
import { FullRecipePrint } from './FullRecipePrint'

export const FullRecipe = () => {
    return (
        <Stack
            spacing={8} 
            sx={{alignItems: "center", py: 8 }}
        >
            <FullRecipeHero />
            <FullRecipeInstruction />
            <FullRecipePrint />
            <FullRecipeTags />
        </Stack>
    )
}
