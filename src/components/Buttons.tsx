import ArrowIcon from '@mui/icons-material/ArrowForwardRounded';
import CloseIcon from '@mui/icons-material/CloseRounded';
import MinusIcon from '@mui/icons-material/KeyboardDoubleArrowDownRounded';
import PlusIcon from '@mui/icons-material/KeyboardDoubleArrowUpRounded';
import { Box, Button, IconButton, Typography, styled } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useSnackbar } from 'notistack';
import { useStore } from '../store';
import { getCardName } from '../utils/cards';
import { ResetIcon } from './ResetIcon';

export const Buttons = observer(() => {
   const { gameStore } = useStore();
   const { enqueueSnackbar, closeSnackbar } = useSnackbar();

   const handleClose = (_event: React.SyntheticEvent | null, reason?: string) => {
      if (reason === 'clickaway') {
         return;
      }

      closeSnackbar();
   };

   const showLastDrawnCard = () => {
      if (gameStore.state.lastDrawnCard) {
         enqueueSnackbar({
            hideIconVariant: true,
            variant: 'default',
            persist: true,
            onClose: (e, reason) => handleClose(e, reason),
            message: gameStore.state.lastLostCard && gameStore.state.lastDrawnCard && (
               <Box width="100%" display="flex" alignItems="center" justifyContent="space-between">
                  <Box display="flex" alignItems="center" flexDirection="column">
                     <img
                        src={`/images/${gameStore.state.lastLostCard.value}_${gameStore.state.lastLostCard.type}.png`}
                        width={60}
                     />
                     <Typography>{getCardName(gameStore.state.lastLostCard)}</Typography>
                  </Box>
                  <ArrowIcon sx={{ mb: 2, mx: 2 }} />
                  <Box display="flex" alignItems="center" flexDirection="column">
                     <img
                        src={`/images/${gameStore.state.lastDrawnCard.value}_${gameStore.state.lastDrawnCard.type}.png`}
                        width={60}
                     />
                     <Typography>{getCardName(gameStore.state.lastDrawnCard)}</Typography>
                  </Box>
               </Box>
            ),
            action: (
               <IconButton
                  size="small"
                  color="inherit"
                  onClick={() => handleClose(null)}
                  sx={{ mx: 1, mb: 2 }}
               >
                  <CloseIcon fontSize="small" />
               </IconButton>
            ),
            style: {
               width: '100%',
               display: 'flex',
               justifyContent: 'center',
            },
         });
      }
   };

   return (
      <Root>
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
            sx={{ p: 2, px: 2 }}
         >
            <Typography variant="h3" fontWeight="bold" color="white">
               Moins
            </Typography>
         </Button>
         <ResetIcon />
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
            sx={{ p: 2, px: 2 }}
         >
            <Typography variant="h3" fontWeight="bold" color="white">
               Plus
            </Typography>
         </Button>
      </Root>
   );
});

const Root = styled(Box)(({ theme }) =>
   theme.unstable_sx({
      display: 'flex',
      justifyContent: 'center',
      gap: { xs: 2, md: 8 },
      mt: { xs: 0, md: 4 },
   }),
);
