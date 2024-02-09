import { Box, styled } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store';
import { CardImage } from './CardImage';

export const Board = observer(() => {
   const { gameStore } = useStore();

   return (
      <Root>
         {gameStore.state.board.map(({ type, value }, idx) => (
            <CardImage
               src={
                  gameStore.isIndexHidden(idx)
                     ? '/images/HIDDEN.png'
                     : `/images/${value}_${type}.png`
               }
               key={`${value}-${type}`}
               active={gameStore.state.currentBoardIndex === idx}
            />
         ))}
      </Root>
   );
});

const Root = styled(Box)(() => ({
   display: 'flex',
   justifyContent: 'center',
   gap: '1rem',
}));
