import { Card, Heading, HStack, LinkBox, LinkOverlay, VStack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

import UpdateBadge from "./UpdateBadge";

import { updateTypes, systemNames } from "../constants/appConfig";

export default function UpdateCard({ data }) {
  return (
    <>
      <LinkBox
        as="article"
      >
        <Card
          bg="gray.800"
          color="text.DEFAULT"
          p={4}
          border="1px"
          borderColor="gray.700"
          transition="all 0.2s"
          w="full"
          h="full"
          _hover={{
            borderColor: 'purple.400',
            transform: 'translateY(-2px)',
          }}
        >
          <VStack spacing={2}>
            <HStack
              w="full"
              justifyContent="center"
              alignItems="center"
            >
              <UpdateBadge type={data.type}>{updateTypes[data.type]}</UpdateBadge>
              {data.involvedSystems.map((system, index) => (
                <UpdateBadge key={index} bg="text.DEFAULT">{systemNames[system]}</UpdateBadge>
              ))}
            </HStack>
            <HStack
              w="full"
              justifyContent="center"
              alignItems="center"
            >
              <UpdateBadge bg="purple.300">
                {data.version}
              </UpdateBadge>
              <LinkOverlay as={RouterLink} to={`/updates/${data.id}`} color="text.DEFAULT">
                <Heading
                  as="h3"
                  size="md"
                >
                  {data.title}
                </Heading>
              </LinkOverlay>
            </HStack>
          </VStack>
        </Card>
      </LinkBox>
    </>
  )
}