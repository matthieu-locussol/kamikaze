import { Box } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store';

export const HardcoreScreen = observer(() => {
   const { gameStore } = useStore();

   return <Box>Hardcore game {gameStore.state.mode}</Box>;
});
