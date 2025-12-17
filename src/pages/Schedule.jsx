import { useEffect, useRef, useState } from 'react';
import {
  Container,
  useToast,
  VStack,
  Heading,
  Divider,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';

import SEO from '../components/SEO';
import ScheduleDayCard from '../components/ScheduleDayCard';
import ScheduleDayCardSkeleton from '../components/ScheduleDayCardSkeleton';
import ReloadButton from '../components/ReloadButton';
import SelectWeekMenu from '../components/SelectWeekMenu';

import { fetchScheduleData, fetchWeeksData } from '../services/schedule';

import { daysOfWeek } from '../constants/appConfig';

export default function Schedule() {
  const todayRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [retryCount, setRetryCount] = useState(0);
  const [scheduleData, setScheduleData] = useState(null);
  const [weeksData, setWeeksData] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const weekNumber = parseInt(searchParams.get('week')) || '';

  const toast = useToast();

  useEffect(() => {
    let isCancelled = false;
    setIsLoading(true);
    setIsError(false);

    const loadData = async () => {
      try {
        const [scheduleResp, weeksResp] = await Promise.all([
          fetchScheduleData(weekNumber),
          fetchWeeksData(),
        ]);

        if (isCancelled) return;

        setScheduleData(scheduleResp.data);
        setWeeksData(weeksResp.data);

        const targetWeek =
          weeksResp.data.find(w => w.number === weekNumber) ||
          weeksResp.data[2];

        setSelectedWeek(targetWeek);
      } catch (error) {
        if (!isCancelled) {
          toast({
            title: 'Ошибка загрузки данных',
            description: 'Не удалось загрузить расписание. Попробуйте позже.',
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
  }, [weekNumber, retryCount]);

  useEffect(() => {
    if (todayRef.current) {
      todayRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [scheduleData])

  const handleWeekChange = (week) => {
    setSelectedWeek(week);
    setSearchParams({ week: week.number });
  };

  return (
    <>
      <SEO
        title="Расписание — SCHEDLY"
        description="Расписание уроков."
        keywords="SCHEDLY, расписание, Telegram-бот"
      />

      <Container mt={16} maxW="container.xl" py={10} centerContent>
        <VStack spacing={8} align="stretch" w="full">
          <Heading
            as="h1"
            size="2xl"
            color="purple.400"
            textAlign="center"
          >
            Расписание уроков
          </Heading>
          <VStack>
            <Heading textAlign="left" size="sm" color="gray.200">
              Выбрать неделю
            </Heading>
            <SelectWeekMenu
              selectedWeek={selectedWeek}
              weeksData={weeksData}
              onChange={handleWeekChange}
              isLoading={isLoading}
              isError={isError}
            />
          </VStack>

          <Divider my={3} borderColor="bg.neutral" />

          {isError && <VStack spacing={8}>
            <Text size="xl" textAlign="center">Возникла непредвиденная ошибка, попробуйте позже.</Text>
            <ReloadButton setRetryCount={setRetryCount} />
          </VStack>}

          {!isError && <SimpleGrid spacing={4} columns={{ base: 1, md: 2 }}>
            {daysOfWeek.map((day, index) => (
              isLoading
                ? <ScheduleDayCardSkeleton key={index} dayName={day} />
                : <ScheduleDayCard
                  key={index}
                  dayName={day}
                  data={scheduleData?.days?.[index]}
                  scrollToRef={todayRef}
                />
            ))}
          </SimpleGrid>}
        </VStack>
      </Container>
    </>
  )
}