import { Dialog, DialogContent, DialogTitle, Divider, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store';
import { EndgameStatistics } from './EndgameStatistics';

export const LoseModal = observer(() => {
   const { gameStore } = useStore();

   return (
      <Dialog
         fullWidth
         maxWidth="xs"
         onClose={() => gameStore.closeLoseModal()}
         open={gameStore.state.openLoseModal}
      >
         <DialogTitle>Défaite</DialogTitle>
         <DialogContent>
            <Typography>Vous avez perdu la partie...</Typography>
            <Divider orientation="horizontal" sx={{ my: 2 }} />
            <EndgameStatistics />
         </DialogContent>
      </Dialog>
   );
});
