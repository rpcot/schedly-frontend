import {
  Box,
  Flex,
  Text,
  useDisclosure,
  useColorModeValue,
  Stack,
  IconButton,
  Spacer,
  Link as ChakraLink,
  HStack,
  Collapse,
  Image,
  Icon,
  Grid,
} from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

import { MdClose, MdMenu, MdOpenInNew } from 'react-icons/md';

const Links = [
  { name: 'Главная', url: '/' },
  { name: 'Информация', url: '/info' },
  { name: 'Каникулы', url: '/holidays' },
  { name: 'Обновления', url: '/updates' },
  { name: 'Telegram Бот', url: 'https://t.me/raspisssanie_bot', external: true },
  { name: 'GitHub', url: 'https://github.com/rpcot/schedly', external: true },
];

const NavLinks = ({ activeUrl }) => {
  const commonLinkProps = {
    px: 3,
    py: 2,
    rounded: 'md',
    fontSize: 'sm',
    fontWeight: 'medium',
    transition: 'background-color 0.2s ease-in-out',
    _hover: {
      textDecoration: 'none',
      bg: 'purple.500',
    },
    _focusVisible: {
      outline: 'none',
      boxShadow: `0 0 0 3px var(--chakra-colors-purple-500)`,
    },
  };

  return (
    <HStack spacing={4} as="nav">
      {Links.map((link) => {
        const isExternal = link.external;
        const isActive = !isExternal
          && activeUrl === link.url
          || activeUrl.startsWith(`${link.url}/`);

        if (isExternal) {
          return (
            <ChakraLink
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              {...commonLinkProps}
              bg="transparent"
              display="inline-flex"
              alignItems="center"
              _hover={{
                textDecoration: 'underline'
              }}
            >
              <Box as="span">{link.name}</Box>
              <Icon
                as={MdOpenInNew}
                w={4}
                h={4}
                ml={1.5}
              />
            </ChakraLink>
          );
        }

        return (
          <ChakraLink
            as={RouterLink}
            key={link.name}
            to={link.url}
            {...commonLinkProps}

            bg={isActive ? 'purple.600' : 'transparent'}
          >
            {link.name}
          </ChakraLink>
        );
      })}
    </HStack>
  );
};

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const currentPath = location.pathname;

  const bg = useColorModeValue('bg.500');

  return (
    <>
      <Box
        bg={bg}
        px={4}
        color="white"
        borderBottom="1px"
        borderColor="bg.neutral"
        position="fixed"
        top="0"
        left="0"
        right="0"
        zIndex="sticky"
      >
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'} maxW="8xl" mx="auto">
          <Grid
            templateColumns="1fr auto 1fr"
            alignItems="center"
            w="full"
          >
            <Flex alignItems="center">
              <Image src='./favicon.png' alt='logo' boxSize='50px' mr={3} />
              <Text
                as="a"
                href="/"
                fontSize="xl"
                fontWeight="bold"
                color="text.DEFAULT"
                whiteSpace="nowrap"
                _hover={{ textDecoration: 'none' }}
              >
                SCHEDLY 🎄
              </Text>
            </Flex>

            <Box display={{ base: 'none', md: 'flex' }} justifyContent="center">
              <NavLinks activeUrl={currentPath} />
            </Box>

            <Box display={{ base: 'none', md: 'flex' }} justifyContent="flex-end" />
          </Grid>

          <IconButton
            size={'md'}
            icon={isOpen ? <MdClose size="24px" /> : <MdMenu size="24px" />}
            aria-label={'Открыть меню'}
            onClick={isOpen ? onClose : onOpen}
            ml={4}
            display={{ md: 'none', base: 'flex' }}
            alignItems="center"
            justifyContent="center"
            backgroundColor="text.DEFAULT"
          />
        </Flex>

        <Collapse in={isOpen} animate='true' unmountOnExit>
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4} mt={2}>
              {Links.map((link) => (
                link.external
                  ? <ChakraLink
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    bg="transparent"
                    display="inline-flex"
                    alignItems="center"
                    _hover={{
                      textDecoration: 'underline'
                    }}
                    onClick={onClose}
                  >
                    <Box as="span">{link.name}</Box>
                    <Icon
                      as={MdOpenInNew}
                      w={4}
                      h={4}
                      ml={1.5}
                    />
                  </ChakraLink>
                  : <ChakraLink
                    key={link.name}
                    as={RouterLink}
                    to={link.url}
                    onClick={onClose}
                  >
                    {link.name}
                  </ChakraLink>
              ))}
            </Stack>
          </Box>
        </Collapse>
      </Box>
    </>
  );
}