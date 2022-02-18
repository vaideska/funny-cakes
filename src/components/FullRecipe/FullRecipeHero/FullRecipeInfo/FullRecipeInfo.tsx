import { AccessTimeRounded } from '@mui/icons-material'
import { Avatar, Box, Divider, Stack, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectRecipeById } from '../../../../store/slices/recipes/recipesSelectors'
import { MatchParams } from '../../../../types/globalTypes'
import { getTime } from '../../../../utils/functions'
import { FullRecipeInfoAccordion } from './FullRecipeInfoAccordion'
import { FullRecipeInfoStatItem } from './FullRecipeInfoStatItem'
import { FullRecipeInfoTitle } from './FullRecipeInfoTitle'

export const FullRecipeInfo = () => {
    const routeParams = useParams<MatchParams>()
    const recipe = useSelector(selectRecipeById(routeParams.id))
    const duration = recipe?.duration + ' минут'
    const fullName = recipe?.owner.firstName + ' ' + recipe?.owner.lastName
    const avatar = recipe?.owner.profile_picture

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
            <FullRecipeInfoTitle />
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
                <FullRecipeInfoStatItem
                    icon={<AccessTimeRounded />}
                    txt={duration}
                />
            </Stack>
            <FullRecipeInfoAccordion />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pb: 2 }}>
                <Avatar
                    alt={fullName + " Аватар"}
                    src={avatar}
                    sx={{
                        mr: 1,
                        boxShadow: 2,
                        width: 32,
                        height: 32
                    }}
                />
                <Typography variant='body2'>
                    {fullName}
                </Typography>
                <Divider
                    orientation="vertical"
                    flexItem
                    sx={{
                        height: 12,
                        my: 'auto',
                        mx: 1
                    }}
                />
                <Typography variant='body2'>
                    {getTime(recipe?.date)}
                </Typography>
            </Box>
        </Box>
    )
}
