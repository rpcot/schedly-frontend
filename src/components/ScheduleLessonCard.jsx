import {
  Box,
  Divider,
  Flex,
  Heading,
  VStack,
  Text,
  Icon,
  useToast,
  Tooltip,
  Link,
  HStack,
} from "@chakra-ui/react";
import {
  MdAccessTime,
  MdAttachFile,
  MdCancel,
  MdHome,
  MdLocationPin,
  MdWarning,
} from "react-icons/md";

export default function ScheduleLessonCard({ number, lesson }) {
  const toast = useToast();

  const bgColor = number % 2 === 0
    ? "gray.900"
    : "gray.800";

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Скопировано в буфер обмена',
      status: 'success',
      duration: 2000,
      isClosable: true,
      position: 'top',
    });
  }

  return (
    <Box
      w="100%"
      bg={bgColor}
      border="1px"
      borderColor="gray.700"
      rounded="xl"
      p={4}
      opacity={lesson.canceled ? 0.5 : 1}
    >
      <Flex align="stretch" gap={4}>
        <Tooltip
          aria-label="статус урока"
          label={lesson.canceled ? "Урок отменён" : null}
          openDelay={500}
          hasArrow
        >
          <Flex
            w="40px"
            justify="center"
            align="center"
            bg="purple.500"
            rounded="lg"
            minHeight="80px"
            minWidth="40px"
            maxWidth="40px"
            fontSize="2xl"
            fontWeight="bold"
            color="white"
            p={2}
          >
            {lesson.canceled && <MdCancel />}
            {!lesson.canceled && number}
          </Flex>
        </Tooltip>

        <VStack
          flex="1"
          align="start"
          spacing={1}
          py={2}
        >
          <Heading
            size="md"
            color="white"
            display="inline-flex"
            alignItems="center"
            gap={2}
          >
            {lesson.name}
          </Heading>
          <Flex gap={2}>
            {lesson.cabinet !== '-' && (
              <Text
                as="span"
                fontSize="xs"
                color="gray.400"
                display="inline-flex"
                alignItems="center"
              >
                <Icon as={MdLocationPin} w={4} h={4} mr={1} />
                {lesson.cabinet}
              </Text>
            )}
            <Text
              as="span"
              fontSize="xs"
              color="gray.400"
              display="inline-flex"
              alignItems="center"
            >
              <Icon as={MdAccessTime} w={4} h={4} mr={1} />
              {lesson.bell}
            </Text>
          </Flex>

          <Divider borderColor="bg.neutral" my={1} />

          <VStack align="start" spacing={1}>
            {!lesson.homework[0] ? (
              <Text as="span" fontSize="sm" fontWeight="medium" color="gray.400">
                Домашнее задание не указано
              </Text>
            ) : (
              <Flex
                align="center"
                justify="center"
              >
                <Icon as={MdHome} color="gray.300" w={4} h={4} mr={2} />
                <VStack align="start" spacing={0}>
                  {lesson.homework.map((text, index) => (
                    <Text
                      key={index}
                      fontSize="sm"
                      fontWeight="medium"
                      as="span"
                      color="gray.300"
                      cursor="pointer"
                      onClick={() => copyToClipboard(text)}
                      _hover={{
                        color: 'gray.200',
                      }}
                      transition="all 0.2s"
                    >
                      {text}
                    </Text>
                  ))}
                </VStack>
              </Flex>
            )
            }
            {!!lesson.attachments.length && (
              <HStack direction="row" spacing={2} justify="start">
                <Icon as={MdAttachFile} w={4} h={4} />
                {lesson.attachments.map((attachment, index) => (
                  <Link
                    as="a"
                    key={index}
                    href={attachment.url}
                    isExternal
                    fontSize="sm"
                    color="gray.100"
                    _hover={{ textDecoration: 'underline', color: "gray.50" }}
                  >
                    {attachment.name}
                  </Link>
                ))}
              </HStack>
            )}
            {lesson.exam && (
              <Tooltip
                label="Проверочная работа"
                aria-label="exam-tooltip"
                openDelay={500}
                hasArrow
              >
                <Text
                  fontSize="sm"
                  color="purple.400"
                  alignItems="center"
                  display="inline-flex"
                  fontWeight="medium"
                >
                  <Icon as={MdWarning} w={4} h={4} mr={2} />
                  {lesson.exam}
                </Text>
              </Tooltip>
            )}
          </VStack>
        </VStack>

      </Flex>
    </Box>
  );
}