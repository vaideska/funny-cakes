import { ExpandMoreRounded } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FullRecipeInfoIngredientsContainer } from '../../../../../containers/FullRecipeContainer/FullRecipeInfoIngredientsContainer';
import { selectRecipeById } from '../../../../../store/slices/recipes/recipesSelectors';
import { MatchParams } from '../../../../../types/globalTypes';

export const FullRecipeInfoAccordion = () => {
    const routeParams = useParams<MatchParams>()
    const recipe = useSelector(selectRecipeById(routeParams.id))

    return (
        <Box sx={{
            mb: 2,
            '& .MuiAccordion-root.Mui-expanded': {
                m: 0,
            },
            '& .MuiAccordion-root.Mui-expanded:last-of-type': {
                m: 0,
            },
            '& .MuiAccordion-root.Mui-expanded:first-of-type': {
                m: 0,
            },
            '& .MuiAccordion-root .Mui-focusVisible': {
                backgroundColor: 'inherit',
            },
            '& .MuiAccordion-root:before': {
                display: 'none',
            },
            '& .MuiAccordion-root': {
                borderTop: '1px solid rgba(0, 0, 0, 0.12)',
                borderRadius: 0
            }
        }}>
            <Accordion elevation={0}>
                <AccordionSummary expandIcon={<ExpandMoreRounded />}>
                    Описание
                </AccordionSummary>
                <AccordionDetails>
                    <Typography align='justify'>
                        {recipe?.description}
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion elevation={0}>
                <AccordionSummary expandIcon={<ExpandMoreRounded />}>
                    Ингрeдиенты
                </AccordionSummary>
                <AccordionDetails>
                    <FullRecipeInfoIngredientsContainer />
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}
