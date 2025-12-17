import { useState, useEffect } from 'react';
import {
  Container,
  Divider,
  Heading,
  SimpleGrid,
  VStack,
  Text,
  useToast,
  Spinner,
} from "@chakra-ui/react";

import SEO from "../components/SEO";
import ReloadButton from '../components/ReloadButton';
import CountdownHolidayCard from '../components/CountdownHolidayCard';
import CountdownCounterCard from '../components/CountdownCounterCard';

import { fetchHolidays } from '../services/holidays';

import { holidayNames, counterNames } from '../constants/appConfig';

export default function Holidays() {
  const toast = useToast();

  const [holidaysData, setHolidaysData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let isCancelled = false;
    setIsLoading(true);
    setIsError(false);

    const loadData = async () => {
      try {
        const response = await fetchHolidays();

        if (isCancelled) return;

        setHolidaysData(response.data);
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
        title="Каникулы — SCHEDLY"
        description="Расписание и обратный отсчёт до каникул и праздников."
        keywords="SCHEDLY, расписание, Telegram-бот, каникулы, праздники"
      />

      <Container mt={16} maxW="container.xl" py={10} centerContent>
        <VStack spacing={8} align="stretch" w="full">
          <Heading
            as="h1"
            color="purple.400"
            size="2xl"
            textAlign="center"
          >
            Расписание каникул и праздников
          </Heading>

          <Divider borderColor="bg.neutral" my={3} />

          <VStack>
            <Heading
              as="h2"
              color="purple.400"
              size="xl"
              textAlign="center"
            >
              Каникулы
            </Heading>

            <Divider borderColor="bg.neutral" my={3} />

            {(!isLoading && !isError) && <SimpleGrid
              columns={{ base: 1, sm: 2, md: 4 }}
              spacing={8}
              w="full"
            >
              {Object.entries(holidaysData.holidays).map(([holidayId, { start, end }], index) => (
                <CountdownHolidayCard
                  key={index}
                  name={holidayNames[holidayId]}
                  start={start}
                  end={end}
                  plug="Уже прошли"
                  toast={toast}
                />
              ))}
            </SimpleGrid>}
            {isLoading && <Spinner color='purple.400' size="lg" m={1} />}
            {isError && <Text size="xl" textAlign="center">Возникла непредвиденная ошибка, попробуйте позже.</Text>}
          </VStack>

          <VStack>
            <Heading as="h2" color="purple.400" size="xl" textAlign="center">
              Счётчики
            </Heading>

            <Divider borderColor="bg.neutral" my={3} />

            {(!isLoading && !isError) && <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={8} w="full">
              {Object.entries(holidaysData.counters).map(([counterId, { start, end, plug }], index) => (
                <CountdownCounterCard
                  key={index}
                  name={counterNames[counterId]}
                  start={start}
                  end={end}
                  plug={plug}
                  id={counterId}
                />
              ))}
            </SimpleGrid>}
            {isLoading && <Spinner color='purple.400' size="lg" m={1} />}
            {isError && <VStack spacing={8}>
              <Text size="xl" textAlign="center">Возникла непредвиденная ошибка, попробуйте позже.</Text>
              <ReloadButton setRetryCount={setRetryCount} />
            </VStack>}
          </VStack>

        </VStack>
      </Container>
    </>
  );
}