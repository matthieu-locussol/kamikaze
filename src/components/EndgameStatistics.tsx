import { Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store';

export const EndgameStatistics = observer(() => {
   const { gameStore } = useStore();

   return (
      <>
         <Typography variant="overline" fontWeight="bold">
            Statistiques de fin de partie
         </Typography>
         <Typography>
            Cartes restantes dans le deck : <b>{gameStore.remainingCardsCount}</b>
         </Typography>
         <Typography>
            Cartes tirées : <b>{gameStore.drawnCardsCount}</b>
         </Typography>
         <Typography>
            Nombre de gorgées prises : <b>{gameStore.state.sips}</b>
         </Typography>
         <Typography>
            Nombre de cul-secs : <b>{gameStore.state.culSecs}</b>
         </Typography>
      </>
   );
});
