import { Dialog, DialogContent } from '@mui/material'
import { FormLogin } from '../FormLogin/FormLogin'

interface AuthZModalProps {
    isOpen: boolean,
    variant: string,
    handleModalClose: () => void
}

export const AuthZModal = ({ isOpen, variant, handleModalClose }: AuthZModalProps) => {
    return (
        <Dialog open={ isOpen } onClose={handleModalClose}>
            <DialogContent sx={{maxWidth: '400px', py: 2, px: 3}}>
                {variant === 'login' && <FormLogin />}
            </DialogContent>
        </Dialog>
    )
}
