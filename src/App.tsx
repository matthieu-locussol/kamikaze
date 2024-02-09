import { Box } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { HardcoreScreen } from './screens/HardcoreScreen';
import { ModeScreen } from './screens/ModeScreen';
import { NormalScreen } from './screens/NormalScreen';
import { useStore } from './store';
import './styles/globals.css';

const App = observer(() => {
   const { gameStore } = useStore();

   return (
      <Box>
         {gameStore.state.mode === null && <ModeScreen />}
         {gameStore.state.mode === 'Normal' && <NormalScreen />}
         {gameStore.state.mode === 'Hardcore' && <HardcoreScreen />}
      </Box>
   );
});

export default App;
