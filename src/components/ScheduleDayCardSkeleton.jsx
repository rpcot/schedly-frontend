import { Card, Heading, VStack, Flex, Skeleton } from "@chakra-ui/react";
import ScheduleLessonCardSkeleton from "./ScheduleLessonCardSkeleton";

const getSkeletonCount = (n) =>
  n % 2 === 0 ? 4 :
    n % 3 === 0 ? 5 : 6;

export default function ScheduleDayCardSkeleton({ dayName, number }) {
  const count = getSkeletonCount(number);

  return (
    <Card
      p={6}
      bg="gray.800"
      border="1px"
      borderColor="gray.700"
      color="white"
      _hover={{ borderColor: "purple.400" }}
      transition="all 0.2s"
    >
      <Flex direction="column" align="center">
        <Heading size="md" mb={2} textTransform="capitalize">
          {dayName}
        </Heading>
        <Skeleton startColor="gray.800" endColor="gray.700" w="100px" h="24px" mb={4} />
      </Flex>

      <VStack spacing={2}>
        {Array.from({ length: count }).map((_, index) => (
          <ScheduleLessonCardSkeleton key={index} number={index + 1} />
        ))}
      </VStack>
    </Card>
  );
}
