import { Box } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store';

export const NormalScreen = observer(() => {
   const { gameStore } = useStore();

   return <Box>Normal game {gameStore.state.mode}</Box>;
});
