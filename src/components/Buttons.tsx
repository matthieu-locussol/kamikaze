import MinusIcon from '@mui/icons-material/KeyboardDoubleArrowDownRounded';
import PlusIcon from '@mui/icons-material/KeyboardDoubleArrowUpRounded';
import { Box, Button, Typography, styled } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useSnackbar } from 'notistack';
import { useStore } from '../store';
import { getCardName } from '../utils/cards';
import { ResetIcon } from './ResetIcon';

export const Buttons = observer(() => {
   const { gameStore } = useStore();
   const { enqueueSnackbar } = useSnackbar();

   const showLastDrawnCard = () => {
      if (gameStore.state.lastDrawnCard) {
         enqueueSnackbar({
            hideIconVariant: true,
            variant: 'default',
            message: (
               <Box width="100%" display="flex" gap={2} alignItems="center">
                  <img
                     src={`/images/${gameStore.state.lastDrawnCard.value}_${gameStore.state.lastDrawnCard.type}.png`}
                  />
                  <Box display="flex" flexDirection="column">
                     <Typography>Vous avez pioché :</Typography>
                     <Typography fontWeight="bold">
                        {getCardName(gameStore.state.lastDrawnCard)}
                     </Typography>
                  </Box>
               </Box>
            ),
         });
      }
   };

   return (
      <Root>
         <Button
            variant="contained"
            color="info"
            startIcon={<PlusIcon />}
            endIcon={<PlusIcon />}
            disabled={gameStore.lost || gameStore.won}
            onClick={() => {
               gameStore.guessMore();
               showLastDrawnCard();
            }}
            sx={{ p: 2, px: 6 }}
         >
            <Typography variant="h3" fontWeight="bold" color="white">
               Plus
            </Typography>
         </Button>
         <ResetIcon />
         <Button
            variant="contained"
            color="error"
            startIcon={<MinusIcon />}
            endIcon={<MinusIcon />}
            disabled={gameStore.lost || gameStore.won}
            onClick={() => {
               gameStore.guessLess();
               showLastDrawnCard();
            }}
            sx={{ p: 2, px: 6 }}
         >
            <Typography variant="h3" fontWeight="bold" color="white">
               Moins
            </Typography>
         </Button>
      </Root>
   );
});

const Root = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'center',
   gap: theme.spacing(8),
   marginTop: theme.spacing(4),
}));
