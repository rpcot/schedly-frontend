import {
  Box,
  Divider,
  Flex,
  Heading,
  VStack,
  Icon,
  Skeleton,
} from "@chakra-ui/react";
import { MdAccessTime, MdHome, MdLocationPin } from "react-icons/md";

const getSkeletonCount = (n) =>
  n % 2 === 0 ? 2 :
    n % 3 === 0 ? 3 : 1;

const SkeletonLine = ({ w, h, mb = 1 }) => (
  <Skeleton startColor="gray.800" endColor="gray.700" w={w} h={h} mb={mb} />
);

export default function ScheduleLessonCardSkeleton({ number }) {
  const count = getSkeletonCount(number);
  const items = Array.from({ length: count });

  return (
    <Box
      w="100%"
      bg={number % 2 === 0 ? "gray.900" : "gray.800"}
      border="1px"
      borderColor="gray.700"
      rounded="xl"
      p={4}
    >
      <Flex align="stretch" gap={4}>
        <Flex
          w="40px"
          justify="center"
          align="center"
          bg="purple.500"
          rounded="lg"
          minHeight="80px"
          fontSize="2xl"
          fontWeight="bold"
          color="white"
          p={2}
        >
          {number}
        </Flex>

        <VStack flex="1" align="start" spacing={2} py={2}>
          <Heading size="md" color="white">
            <SkeletonLine w="200px" h="24px" mb={2} />

            <Flex gap={3} color="gray.400" fontSize="xs">
              <Flex align="center" gap={1}>
                <Icon as={MdLocationPin} w={4} h={4} />
                <SkeletonLine w="40px" h="16px" mb={0} />
              </Flex>

              <Flex align="center" gap={1}>
                <Icon as={MdAccessTime} w={4} h={4} />
                <SkeletonLine w="45px" h="16px" mb={0} />
              </Flex>
            </Flex>
          </Heading>

          <Divider borderColor="gray.700" />

          <Flex align="center">
            <Icon as={MdHome} color="gray.300" w={4} h={4} mr={2} />
            <VStack align="start" spacing={1}>
              {items.map((_, index) => (
                <SkeletonLine
                  key={index}
                  w={`${100 + Math.random() * 100}px`}
                  maxW="100%"
                  h="20px"
                />
              ))}
            </VStack>
          </Flex>
        </VStack>
      </Flex>
    </Box>
  );
}
