import { Dialog, DialogContent } from '@mui/material'
import { FormRegisterContainer } from '../../containers/AuthZFormContainer/FormRegisterContainer'
import { FormLoginContainer } from '../../containers/AuthZFormContainer/FormLoginContainer'

interface AuthZModalProps {
    isOpen: boolean,
    variant: string,
    handleModalClose: () => void
}

export const AuthZModal = ({ isOpen, variant, handleModalClose }: AuthZModalProps) => {
    return (
        <Dialog open={ isOpen } onClose={handleModalClose}>
            <DialogContent sx={{maxWidth: '400px', py: 2, px: 3}}>
                {variant === 'login' && <FormLoginContainer />}
                {variant === 'register' && <FormRegisterContainer />}
            </DialogContent>
        </Dialog>
    )
}
