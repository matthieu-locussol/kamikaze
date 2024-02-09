import { Box } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Board } from '../components/Board';
import { Buttons } from '../components/Buttons';
import { CulSecModal } from '../components/CulSecModal';
import { DrinkModal } from '../components/DrinkModal';
import { LoseModal } from '../components/LoseModal';
import { Statistics } from '../components/Statistics';
import { Title } from '../components/Title';
import { WinModal } from '../components/WinModal';

export const HardcoreScreen = observer(() => (
   <Box>
      <Title />
      <Board />
      <Buttons />
      <Statistics />
      <WinModal />
      <LoseModal />
      <DrinkModal />
      <CulSecModal />
   </Box>
));
