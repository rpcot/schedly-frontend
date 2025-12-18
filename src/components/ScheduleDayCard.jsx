import { Card, Heading, VStack, Text, Icon, Tooltip } from "@chakra-ui/react";
import ScheduleLessonCard from "./ScheduleLessonCard";
import { MdCelebration, MdPushPin } from "react-icons/md";
import { isTouchDevice } from "../utils/device";

export default function ScheduleDayCardSkeleton({ dayName, data, scrollToRef }) {
  return (
    <>
      <Card
        ref={data.today ? scrollToRef : null}
        p={6}
        bg="gray.800"
        border="1px"
        borderColor={data.today ? "purple.400" : "gray.700"}
        color="white"
        _hover={{
          borderColor: 'purple.400',
        }}
        transition="all 0.2s"
        scrollMarginTop="80px"
      >
        <VStack spacing={1} mb={4}>
          <Heading as="h4" size="md" textTransform="capitalize">
            {dayName} ({data.date}) {data.today ? "- Сегодня" : ""}
          </Heading>
          {!data.holiday && <Text as="h6" size="sm" color="gray.200">
            {data.lessonsStartTime} – {data.lessonsEndTime}
          </Text>}
          {data.note && <Text as="h6" size="sm" color="gray.400" alignItems="center" display="inline-flex">
            <Tooltip
              aria-label="примечание"
              label="Примечание ко дню"
              openDelay={500}
              hasArrow
            >
              <Icon as={MdPushPin} color="purple.400" w={4} h={4} mr={2} transform="rotate(45deg)" />
            </Tooltip>
            {data.note}
          </Text>}
        </VStack>
        {data.holiday && <Text
          as="span"
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
          mb={isTouchDevice() ? 0 : 4}
        >
          <Icon as={MdCelebration} color="purple.400" w={4} h={4} mr={2} />
          В данный день нет уроков
        </Text>}
        {!data.holiday || (data.holiday && !isTouchDevice())
          ? <VStack spacing={2} opacity={data.holiday ? 0.2 : 1}>
            {data.lessons.map((lesson, index) => (
              <ScheduleLessonCard key={index} number={index + 1} lesson={lesson} />
            ))}
          </VStack>
          : null}
      </Card>
    </>
  );
}