import { Dialog, DialogContent, DialogTitle, Divider, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store';
import { EndgameStatistics } from './EndgameStatistics';

export const WinModal = observer(() => {
   const { gameStore } = useStore();

   return (
      <Dialog
         fullWidth
         maxWidth="xs"
         onClose={() => gameStore.closeWinModal()}
         open={gameStore.state.openWinModal}
      >
         <DialogTitle>
            Victoire <b>{gameStore.state.oneShot ? 'One Shot' : ''}</b>
         </DialogTitle>
         <DialogContent>
            <Typography>
               Bravo ! Vous avez gagné la partie
               {gameStore.state.oneShot ? ' en One Shot !' : ' !'}
            </Typography>
            <Divider orientation="horizontal" sx={{ my: 2 }} />
            <EndgameStatistics />
         </DialogContent>
      </Dialog>
   );
});
