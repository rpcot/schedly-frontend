import { Button, Container, Divider, Flex, Heading, Link, Text, VStack } from "@chakra-ui/react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

import SEO from "../components/SEO";
import ScrollToTop from "../components/ScrollToTop";
import NavBar from "../components/Navbar";

export default function ServerErrorPage() {
  const error = useRouteError();
  let title = '404 — Страница не найдена';
  let message = 'Извините, но запрашиваемая вами страница не существует. Пожалуйста, проверьте URL или вернитесь на главную страницу.';

  if (isRouteErrorResponse(error)) {
    if (error.status >= 500) {
      title = `${error.status} — Внутренняя ошибка сервера`;
      message = 'Произошла внутренняя ошибка сервера. Пожалуйста, попробуйте позже.';
    } else if (error.status !== 404) {
      title = `${error.status} — Ошибка`;
      message = error.statusText || 'Произошла ошибка при обработке вашего запроса.';
    }
  } else if (error instanceof Error) {
    title = 'Ошибка';
    message = error.message;
  }

  console.error(error);

  return <>
    <SEO
      title="Страница не найдена — SCHEDLY"
      description="Запрашиваемая страница не найдена"
      keywords="SCHEDLY, расписание, Telegram-бот, информация, проект"
    />
    <ScrollToTop />

    <NavBar />

    <Container mt={16} maxW="container.xl" py={10} centerContent>
      <VStack spacing={8} align="stretch" w="full">
        <Heading
          as="h1"
          size="2xl"
          textAlign="center"
          color="purple.400"
        >
          {title}
        </Heading>

        <Divider my={3} borderColor="bg.neutral" />

        <Text fontSize="lg" textAlign="center">
          {message}
        </Text>

        <Flex justify="center">
          <Button
            as={Link}
            href="/"
            colorScheme="purple"
            size="lg"
            _hover={{ textDecoration: 'none', bg: 'purple.600' }}
            _active={{ bg: 'purple.700' }}
          >
            Вернуться на главную
          </Button>
        </Flex>
      </VStack>
    </Container>
  </>
}