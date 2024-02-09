import { Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store';

export const Title = observer(() => {
   const { gameStore } = useStore();

   return (
      <>
         <Typography variant="h1" align="center" fontWeight="bold" letterSpacing={2}>
            Kamikaze
         </Typography>
         {!gameStore.lost && !gameStore.won && (
            <Typography variant="h1" align="center" gutterBottom>
               Partie normale
            </Typography>
         )}
         {gameStore.lost && (
            <Typography variant="h1" align="center" gutterBottom>
               Défaite
            </Typography>
         )}
         {gameStore.won && (
            <Typography variant="h1" align="center" gutterBottom>
               Victoire
            </Typography>
         )}
      </>
   );
});
