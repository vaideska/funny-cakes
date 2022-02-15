import { List, ListItem, Slider, ListItemText, TextField, Stack } from '@mui/material'

const mockIngredients = [
    {
        ingredient: 'Яйцо',
        amount: '2 шт'
    },
    {
        ingredient: 'Соль',
        amount: '1 щепотка'
    },
    {
        ingredient: 'Мука пшеничная',
        amount: '180 г'
    },
    {
        ingredient: 'Разрыхлитель',
        amount: '10 г'
    },
    {
        ingridient: 'Сгущенное молоко ',
        amount: '300 г'
    }
]

export const RecipeInfoIngredients = () => {
    return (
        <Stack alignItems={'center'}>
            <TextField
                label="Диаметр коржа см."
                variant="outlined"
                fullWidth
                sx={{
                    maxWidth: 280,
                    mb: 1.5
                }}
            />
            <Slider
                aria-label="Temperature"
                defaultValue={30}
                valueLabelDisplay="auto"
                step={5}
                marks
                min={15}
                max={50}
                sx={{ maxWidth: 400 }}
            />
            <List sx={{ width: '100%' }}>
                {mockIngredients.map((data, index) => (
                    <ListItem
                        key={index}
                        divider
                        sx={{ px: 0 }}
                    >
                        <ListItemText primary={data.ingredient} />
                        <ListItemText primary={data.amount} sx={{ textAlign: 'end' }} />
                    </ListItem>
                ))}
            </List>
        </Stack>
    )
}
