import { Box, BoxProps, styled } from '@mui/material';

export const Layout = (props: BoxProps) => {
   return <Root {...props} />;
};

const Root = styled(Box)(({ theme }) => ({
   padding: theme.spacing(8),
   width: '100%',
   height: '100%',
   backgroundColor: theme.palette.background.default,
}));
