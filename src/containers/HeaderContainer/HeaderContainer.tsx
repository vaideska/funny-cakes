import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Header } from '../../components/Header';

interface HeaderContainerProps {
   isLoged: boolean;
}

export const HeaderContainer = ({ isLoged }: HeaderContainerProps) => {
   const history = useHistory()
   const handleLogoClick = useCallback(
      (e) => {
         e.preventDefault();
         history.push('/');
      },
      [],
   )

   return (
      <Header handleLogoClick={handleLogoClick} isLoged={isLoged} />
   )
}