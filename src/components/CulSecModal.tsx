import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store';

export const CulSecModal = observer(() => {
   const { gameStore } = useStore();

   return (
      <Dialog
         fullWidth
         maxWidth="xs"
         onClose={() => gameStore.closeCulSecsModal()}
         open={gameStore.state.openCulSecsModal}
      >
         <DialogTitle>Poteau</DialogTitle>
         <DialogContent>
            <Typography>
               <b>Poteau</b> ! Tu dois boire cul-sec !
            </Typography>
         </DialogContent>
      </Dialog>
   );
});
