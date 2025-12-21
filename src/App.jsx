import { Box, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Snowfall from 'react-snowfall';

import NavBar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
  return (
    <Flex
      direction="column"
      minH="100dvh"
      m={0}
      p={0}
      overflow="hidden"
    >
      <Snowfall snowflakeCount={30} style={{ position: 'fixed' }} />
      <ScrollToTop />

      <NavBar />

      <Box
        as="main"
        flex="1"
        overflowY="auto"
        position="relative"
      >
        <Outlet />
      </Box>
    </Flex>
  );
}