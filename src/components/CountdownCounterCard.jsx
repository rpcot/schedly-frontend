import { useEffect, useState } from "react";
import { Card, CardBody, Heading, Spinner, Text, VStack } from "@chakra-ui/react";

import { formatSecondsToHumanReadable, getSecondsUntil } from "../utils";

export default function CountdownCounterCard({ name, plug, start, end, id, isLoading }) {
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

  const timeLeftFormatted = formatSecondsToHumanReadable(secondsLeft, Infinity, { plug, isAccusative: false });

  const bgGradient = id == "newYear"
    ? "linear(to-br, blue.500, blue.100)"
    : "linear(to-br, green.500, green.200)";

  const hoverBorderColor = id === "newYear"
    ? "blue.200"
    : "green.200";

  return (
    <Card
      bg="gray.800"
      border="1px"
      borderColor="gray.700"
      bgGradient={bgGradient}
      _hover={{
        borderColor: hoverBorderColor,
      }}
      transition="all 0.2s"
    >
      <CardBody>
        <VStack>
          <Heading
            as="h3"
            color="gray.900"
            size="md"
            textAlign="center"
          >
            {name}
          </Heading>
          <Text
            color="gray.800"
            textAlign="center"
            fontSize="md"
            fontWeight="medium"
          >
            {
              isLoading
                ? <Spinner color='purple.400' size="lg" m={1} />
                : secondsLeft > 0
                  ? timeLeftFormatted
                  : plug
            }
          </Text>
        </VStack>
      </CardBody>
    </Card>
  );
}