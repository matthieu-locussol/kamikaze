import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store';

export const DrinkModal = observer(() => {
   const { gameStore } = useStore();

   return (
      <Dialog
         fullWidth
         maxWidth="xs"
         onClose={() => gameStore.closeDrinkModal()}
         open={gameStore.state.openDrinkModal}
      >
         <DialogTitle>Tu bois !</DialogTitle>
         <DialogContent>
            <Typography>
               Dommage, tu dois boire <b>{gameStore.state.lastSips}</b> gorgée
               {gameStore.state.lastSips > 1 ? 's' : ''} !
            </Typography>
         </DialogContent>
      </Dialog>
   );
});
