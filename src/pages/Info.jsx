import {
  Container,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  Divider,
  VStack,
  SimpleGrid,
} from "@chakra-ui/react";

import SEO from "../components/SEO";

import { howItWorks, facts, faq } from "../constants/appConfig";

export default function InfoPage() {
  return (
    <>
      <SEO
        title="Информация — SCHEDLY"
        description="Информация о проекте SCHEDLY — Telegram-боте для управления расписанием."
        keywords="SCHEDLY, расписание, Telegram-бот, информация, проект"
      />

      <Container mt={16} maxW="container.xl" py={10} centerContent>
        <VStack spacing={8} align="stretch" w="full">
          <Heading
            as="h1"
            size="2xl"
            textAlign="center"
            color="purple.400"
          >
            SCHEDLY
          </Heading>
          <Text textAlign="center" fontSize="lg">
            Твой помощник в мире расписаний и обновлений
          </Text>

          <Divider my={3} borderColor="bg.neutral" />

          <Heading as="h2" size="lg" color="white" mb={4}>
            Как это работает
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            {howItWorks.map((step, index) => (
              <Card
                key={index}
                bg="gray.800"
                color="white"
                border="1px"
                borderColor="gray.700"
                p={5}
                _hover={{ borderColor: 'purple.400', transform: 'translateY(-2px)' }}
                transition="all 0.2s"
              >
                <CardHeader p={0}>
                  <Heading size="md" color="purple.400" mb={2}>
                    Шаг {step.step} — {step.title}
                  </Heading>
                </CardHeader>
                <CardBody p={0}>
                  <Text color="gray.400">{step.description}</Text>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>

          <Divider my={3} borderColor="bg.neutral" />

          <Heading as="h2" size="lg" color="white" mb={4}>
            Ключевые принципы
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            {facts.map((fact, index) => (
              <Card
                key={index}
                bg="gray.800"
                color="white"
                border="1px"
                borderColor="gray.700"
                p={5}
                _hover={{ borderColor: 'purple.400', transform: 'translateY(-2px)' }}
                transition="all 0.2s"
              >
                <CardHeader p={0}>
                  <Heading size="md" color="purple.400" mb={2}>
                    {fact.icon} {fact.title}
                  </Heading>
                </CardHeader>
                <CardBody p={0}>
                  <Text color="gray.400">{fact.text}</Text>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>

          <Divider my={3} borderColor="gray.700" />

          <Heading as="h2" size="lg" color="white" mb={4}>
            Часто задаваемые вопросы (FAQ)
          </Heading>

          <VStack spacing={5} align="stretch">
            {faq.map((item, index) => (
              <Card
                key={index}
                bg="gray.800"
                borderLeft="4px"
                borderLeftColor="purple.500"
                p={4}
                _hover={{
                  transform: 'translateX(4px)',
                }}
                transition='all 0.2s'
              >
                <Heading size="sm" color="white" mb={2}>{item.q}</Heading>
                <Text color="gray.400">{item.a}</Text>
              </Card>
            ))}
          </VStack>
        </VStack>
      </Container>
    </>
  )
}