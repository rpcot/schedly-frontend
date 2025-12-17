import { useEffect, useState } from "react";
import { Box, Card, CardBody, Heading, Icon, Text, Tooltip, VStack } from "@chakra-ui/react";

import { MdAccessTime } from "react-icons/md";

import { formatSecondsToHumanReadable, getSecondsUntil, isTouchDevice } from "../utils";

export default function CountdownHolidayCard({ name, plug, start, end, toast }) {
  start = new Date(start);
  end = new Date(end);

  const initialSeconds = getSecondsUntil(start);
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    if (secondsLeft <= 0) {
      return;
    }

    const timerId = setInterval(() => {
      setSecondsLeft(prevSeconds => {
        if (prevSeconds <= 1) {
          clearInterval(timerId);
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [start]);

  const timeLeftFormatted = formatSecondsToHumanReadable(secondsLeft, 3, { plug, isAccusative: true });

  const handleShowTimeClick = (time) => {
    if (isTouchDevice()) {
      toast({
        position: 'top',
        title: time,
        status: 'info',
        duration: 3000,
        isClosable: true,
        render: () => (
          <Box bg="gray.700" px={4} py={2} rounded="md" border="1px" borderColor="gray.700">
            <Text
              color="gray.200"
              textAlign="center"
              alignItems="center"
              display="inline-flex"
            >
              <Icon as={MdAccessTime} w={4} h={4} mr={2} />
              {time}
            </Text>
          </Box>
        )
      });
    }
  };

  return (
    <Card
      bg="gray.800"
      border="1px"
      borderColor="gray.700"
      _hover={{
        borderColor: "purple.400",
      }}
      transition="all 0.2s"
    >
      <CardBody>
        <VStack>
          <Heading
            as="h3"
            color="purple.400"
            size="md"
            textAlign="center"
          >
            {name}
          </Heading>
          <Tooltip
            aria-label='сколько осталось'
            hasArrow
            label={
              secondsLeft > 0
                ? `Через ${timeLeftFormatted}`
                : plug
            }
          >
            <Text
              color="gray.300"
              textAlign="center"
              fontSize="md"
              onClick={() => handleShowTimeClick(
                secondsLeft > 0
                  ? `Через ${timeLeftFormatted}`
                  : plug
              )}
            >
              С {start.toLocaleString('ru-RU', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })} по {end.toLocaleString('ru-RU', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </Text>
          </Tooltip>
        </VStack>
      </CardBody>
    </Card>
  );
}