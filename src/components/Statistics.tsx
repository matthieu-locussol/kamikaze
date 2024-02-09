import { Box, Typography, TypographyProps, styled } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store';

export const Statistics = observer(() => {
   const { gameStore } = useStore();

   return (
      <Root>
         <DisplayedStatistic>
            <Typography variant="h3">Cartes restantes dans le deck :&nbsp;</Typography>
            <StatisticValue>{gameStore.remainingCardsCount}</StatisticValue>
         </DisplayedStatistic>
         <DisplayedStatistic>
            <Typography variant="h3">Nombre de gorgées prises :&nbsp;</Typography>
            <StatisticValue>{gameStore.state.sips}</StatisticValue>
         </DisplayedStatistic>
         <DisplayedStatistic sx={{ pb: 4 }}>
            <Typography variant="h3">Nombre de cul-secs :&nbsp;</Typography>
            <StatisticValue>{gameStore.state.culSecs}</StatisticValue>
         </DisplayedStatistic>
      </Root>
   );
});

const Root = styled(Box)(() => ({
   display: 'flex',
   alignItems: 'center',
   flexDirection: 'column',
}));

const DisplayedStatistic = styled(Box)(() => ({
   display: 'flex',
   minWidth: 320,
}));

const StatisticValue = styled((props: TypographyProps) => <Typography variant="h3" {...props} />)(
   () => ({
      fontWeight: 'bold',
      marginLeft: 'auto',
   }),
);
