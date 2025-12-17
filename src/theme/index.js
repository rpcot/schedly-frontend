import { extendTheme } from '@chakra-ui/react';

const customColors = {
  bg: {
    DEFAULT: '#0D0D0D',
    500: '#181818ff',
    neutral: '#4F4F4F',
  },
  text: {
    DEFAULT: '#E0E0E0',
  },
};

export const theme = extendTheme({
  colors: customColors,
  styles: {
    global: {
      body: {
        bg: 'bg.DEFAULT',
        color: 'text.DEFAULT',
      },
      a: {
        _hover: {
          textDecoration: 'underline',
        },
      },
    },
  },
});