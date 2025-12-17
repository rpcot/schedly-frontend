import { Container, Divider, Heading, VStack, Text, useToast, SimpleGrid, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import SEO from "../components/SEO";
import UpdateCard from "../components/UpdateCard";
import ReloadButton from "../components/ReloadButton";

import { fetchUpdates } from "../services/updates";

export default function NotFound() {
  const toast = useToast();

  const [updatesData, setUpdatesData] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let isCancelled = false;
    setIsLoading(true);
    setIsError(false);

    const loadData = async () => {
      try {
        const response = await fetchUpdates();

        if (isCancelled) return;

        setUpdatesData(response.data);
      } catch (error) {
        if (!isCancelled) {
          toast({
            title: 'Ошибка загрузки данных',
            description: 'Не удалось загрузить данные. Попробуйте позже.',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top',
          });
          setIsError(true);
        }
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    };

    loadData();

    return () => {
      isCancelled = true;
    };
  }, [retryCount]);

  return (
    <>
      <SEO
        title="Обновления — SCHEDLY"
        description="Список изменений бота и его сервисов."
        keyword="SCHEDLY, Telegram-бот, обновления, изменения"
      />

      <Container mt={16} maxW="container.xl" py={10} centerContent>
        <VStack spacing={8} align="stretch" w="full">
          <Heading
            color="purple.400"
            size="2xl"
            as="h1"
            textAlign="center"
          >
            Обновления
          </Heading>

          <Divider borderColor="bg.neutral" my={3} />

          {isLoading && <VStack>
            <Spinner color='purple.400' size="lg" m={4} />
          </VStack>}

          {isError && <VStack spacing={8}>
            <Text size="xl" textAlign="center">Возникла непредвиденная ошибка, попробуйте позже.</Text>
            <ReloadButton setRetryCount={setRetryCount} />
          </VStack>}

          {(!isError && !isLoading) && <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
            {updatesData.map((updateData, index) => (
              <UpdateCard
                key={index}
                data={updateData}
                toast={toast}
              />
            ))}
          </SimpleGrid>}
        </VStack>
      </Container>
    </>
  )
}