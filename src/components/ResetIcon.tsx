import MuiResetIcon from '@mui/icons-material/RestartAltRounded';
import {
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
   IconButton,
   Typography,
   styled,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store';

export const ResetIcon = observer(() => {
   const { gameStore } = useStore();

   return (
      <>
         <StyledIconButton color="primary" onClick={() => gameStore.setResetModalOpen(true)}>
            <MuiResetIcon />
         </StyledIconButton>
         <Dialog
            fullWidth
            maxWidth="xs"
            onClose={() => gameStore.setResetModalOpen(false)}
            open={gameStore.resetModalOpen}
         >
            <DialogTitle>Réinitialisation</DialogTitle>
            <DialogContent>
               <Typography>Êtes-vous sûr de vouloir réinitialiser la partie ?</Typography>
            </DialogContent>
            <DialogActions>
               <Button onClick={() => gameStore.setResetModalOpen(false)}>Annuler</Button>
               <Button
                  variant="contained"
                  onClick={() => {
                     gameStore.resetGame();
                     gameStore.setResetModalOpen(false);
                  }}
               >
                  Réinitialiser
               </Button>
            </DialogActions>
         </Dialog>
      </>
   );
});

const StyledIconButton = styled(IconButton)(({ theme }) => ({
   margin: theme.spacing(1),
   border: `2px solid ${theme.palette.primary.main}`,
   backgroundColor: theme.palette.background.paper,
}));
