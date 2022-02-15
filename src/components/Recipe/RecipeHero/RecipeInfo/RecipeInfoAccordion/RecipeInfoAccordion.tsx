import { ExpandMoreRounded } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material'
import { RecipeIngredients } from '../RecipeInfoIngredients'

export const RecipeInfoAccordion = () => {
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
                        'Сметанник — торт очень простой. Весь секрет — в сметане для крема: она должна быть на вкус такой, чтобы и не в торте ее есть было приятно, — сливочной, плотной и без ярко выраженной кислоты. После выбора сметаны из всех дел останется испечь коржи, промазать их кремом и радоваться сочетанию сметанного крема и бисквита с какао. Можно украсить торт свежими фруктами или ягодами — вид у него получится и вовсе праздничный.'
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion elevation={0}>
                <AccordionSummary expandIcon={<ExpandMoreRounded />}>
                    Ингрeдиенты
                </AccordionSummary>
                <AccordionDetails>
                    <RecipeIngredients />
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}
