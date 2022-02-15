import { Paper } from '@mui/material'
import { ResponsiveImage } from '../../../UI/ResponsiveImage'

export const RecipeImg = () => {
    return (
        <Paper
            elevation={12}
            sx={{
                borderRadius: 3,
                overflow: 'hidden',
            }}
        >
            <ResponsiveImage
                src='https://avatars.mds.yandex.net/get-zen_doc/1129675/pub_5d04914a2ec4b60e6db4da5d_5d0f913491a9fd00ae59ab98/scale_1200'
                alt='тортик'
            />
        </Paper>
    )
}
