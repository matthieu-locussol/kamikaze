import { Box, Card, Stack, Typography, styled } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store';

export const ModeScreen = observer(() => {
   const { gameStore } = useStore();

   return (
      <Box>
         <Typography variant="h1" align="center" fontWeight="bold">
            Kamikaze
         </Typography>
         <Typography variant="h1" align="center" sx={{ mb: 4 }}>
            Choisissez un niveau de difficulté
         </Typography>
         <Stack direction={{ xs: 'column', md: 'row' }} gap={4}>
            <Card variant="clickable" onClick={() => gameStore.chooseMode('Normal')}>
               <Typography variant="h1" align="center">
                  ✨ &nbsp;Normal&nbsp; ✨
               </Typography>
            </Card>
            <Card variant="clickable" onClick={() => gameStore.chooseMode('Hardcore')}>
               <DangerTypography variant="h1" align="center" fontWeight="bold">
                  💀 &nbsp;Shaeff&nbsp; 💀
               </DangerTypography>
            </Card>
         </Stack>
      </Box>
   );
});

const DangerTypography = styled(Typography)(() => ({
   color: '#ef4444',
}));
