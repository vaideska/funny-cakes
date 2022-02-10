import {
    Dialog,
    DialogContent,
} from '@mui/material'

import { SignInForm } from '../SignInForm'

export const Modal = () => {
    return (
        <Dialog open={false} maxWidth="xs">
            <DialogContent>
                <SignInForm />
            </DialogContent>
        </Dialog>
    )
}
