import { AccessTimeRounded } from '@mui/icons-material'
import { Avatar, Box, Divider, Stack, Typography } from '@mui/material'
import { RecipeInfoAccordion } from './RecipeInfoAccordion'
import { RecipeInfoStatItem } from './RecipeInfoStatItem'
import { RecipeInfoTitle } from './RecipeInfoTitle'

const infoItems = [
    {
        icon: <AccessTimeRounded />,
        txt: '60 минут'
    },

]

export const RecipeInfo = () => {
    return (
        <Box
            sx={{
                py: 2,
                px: 3,
                borderRadius: 3,
                bgcolor: 'white.main',
                boxShadow: 10
            }}
        >
            <RecipeInfoTitle>
                Тортик великолепный
            </RecipeInfoTitle>
            <Divider
                sx={{
                    width: 130,
                    mx: 'auto'
                }}
            />
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={4}
                sx={{
                    py: 3
                }}
            >
                {infoItems.map((data, index) => (
                    <RecipeInfoStatItem
                        key={index}
                        icon={data.icon}
                        txt={data.txt}
                    />
                ))}
            </Stack>
            <RecipeInfoAccordion />
            {/* Аватар */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pb: 2 }}>
                <Avatar
                    alt="avatar"
                    src="https://images.unsplash.com/photo-1643921330459-6fb64282f467?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                    sx={{
                        mr: 1,
                        boxShadow: 2,
                        width: 32,
                        height: 32
                    }}
                />
                <Typography variant='body2'>Екатерина Кудинова</Typography>
                <Divider
                    orientation="vertical"
                    flexItem
                    sx={{
                        height: 12,
                        my: 'auto',
                        mx: 1
                    }}
                />
                <Typography variant='body2'>14.02.2022</Typography>
            </Box>
        </Box>
    )
}
