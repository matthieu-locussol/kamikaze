import ArrowIcon from '@mui/icons-material/NavigationRounded';
import { Box, styled } from '@mui/material';
import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

export interface CardImageProps
   extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
      StyleProps {}

export const CardImage = ({ active, ...rest }: CardImageProps) => {
   return (
      <Root>
         <ImageWrapper active={active}>
            <Image {...rest} />
         </ImageWrapper>
         {active && <Icon color="primary" />}
      </Root>
   );
};

interface StyleProps {
   active: boolean;
}

const Root = styled(Box)({
   width: '12%',
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   justifyContent: 'center',
});

const ImageWrapper = styled(Box, {
   shouldForwardProp: (prop) => prop !== 'active',
})<StyleProps>(({ active, theme }) => ({
   width: '100%',
   borderRadius: 8,
   background: active ? theme.palette.primary.main : 'transparent',
   padding: 8,
}));

const Image = styled('img', {
   shouldForwardProp: (prop) => prop !== 'active',
})(() => ({
   width: '100%',
   borderRadius: 8,
   '& > img': {
      borderRadius: '8px !important',
   },
}));

const Icon = styled(ArrowIcon)(({ theme }) => ({
   fontSize: 48,
   marginTop: theme.spacing(1),
   animation: 'blink 1s infinite',
   '@keyframes blink': {
      '0%': {
         opacity: 0.5,
      },
      '50%': {
         opacity: 1,
      },
      '100%': {
         opacity: 0.5,
      },
   },
}));
