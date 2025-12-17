import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Container,
  Divider,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  List,
  ListItem,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
  VStack
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link as RouterLink, useParams } from 'react-router-dom';

import { MdArrowBack } from "react-icons/md";

import SEO from "../components/SEO";
import ReloadButton from "../components/ReloadButton";
import UpdateBadge from "../components/UpdateBadge";

import { fetchUpdate } from "../services/updates";

import { systemNames, updateTypes } from "../constants/appConfig";

export default function Update() {
  const { id } = useParams();

  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState(null);

  const [updateData, setUpdateData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const handleImageOpen = (image) => {
    setSelectedImage(image);
    onOpen();
  };

  const handleImageClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  useEffect(() => {
    let isCancelled = false;
    setIsLoading(true);
    setIsError(false);

    const loadData = async () => {
      try {
        const response = await fetchUpdate(id);

        if (isCancelled) return;

        setUpdateData(response?.data);
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
        title="Подробности обновления — SCHEDLY"
        description="Подробное описание изменений обновления."
        keyword="SCHEDLY, Telegram-бот, обновления, изменения"
      />

      <Container mt={16} maxW="container.xl" py={10} centerContent>
        <VStack spacing={8} align="stretch" w="full">
          <HStack>
            <Link
              as={RouterLink}
              display="inline-flex"
              alignItems="center"
              to="/updates"
            >
              <Icon as={MdArrowBack} w={4} h={4} />
            </Link>
            <Breadcrumb>
              <BreadcrumbItem>
                <BreadcrumbLink href="/updates">Обновления</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink href="#">{updateData?.title || 'Подробности'}</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </HStack>

          <HStack
            w="full"
            justifyContent="center"
            alignItems="center"
          >
            {(!isLoading && !isError && updateData) && (
              <>
                <UpdateBadge bg="purple.300">
                  {updateData.version}
                </UpdateBadge>
                <UpdateBadge type={updateData.type}>{updateTypes[updateData.type]}</UpdateBadge>
                {updateData.involvedSystems.map((system, index) => (
                  <UpdateBadge key={index} bg="text.DEFAULT">{systemNames[system]}</UpdateBadge>
                ))}
              </>
            )}
          </HStack>
          <Heading
            color="purple.400"
            size="2xl"
            as="h1"
            textAlign="center"
          >
            {updateData?.title || 'Информация об обновлении'}
          </Heading>

          <Divider borderColor="bg.neutral" my={3} />

          {isLoading && <VStack>
            <Spinner color='purple.400' size="lg" m={4} />
          </VStack>}

          {isError && <VStack spacing={8}>
            <Text size="xl" textAlign="center">Возникла непредвиденная ошибка, попробуйте позже.</Text>
            <ReloadButton setRetryCount={setRetryCount} />
          </VStack>}

          {(!updateData && !isLoading && !isError) && <VStack spacing={8}>
            <Text size="xl" textAlign="center">Указанное обновление не найдено. Пожалуйста, проверьте корректность URL.</Text>
          </VStack>}

          {(!isError && !isLoading && updateData) && (
            <>
              <VStack>
                <Heading as="h2" color="purple.400" size="xl" textAlign="center">
                  Изменения
                </Heading>

                <Divider borderColor="bg.neutral" my={3} />

                <VStack spacing={4} alignItems="stretch" w="full">
                  {updateData.body.length === 0 && <Text size="xl" textAlign="center">В обновлении не указаны изменения.</Text>}
                  {updateData.body.map((item, index) => (
                    <Box
                      key={index}
                      p={4}
                      bg="gray.800"
                      borderRadius="lg"
                      borderLeft="4px solid"
                      borderColor="purple.500"
                      transition="transform 0.2s"
                      _hover={{ transform: "translateX(4px)" }}
                    >
                      <HStack justifyContent="space-between" mb={2}>
                        <HStack>
                          <UpdateBadge bg="purple.300" color="white">
                            {item.version}
                          </UpdateBadge>
                          <Text fontWeight="bold" color="gray.100" fontSize="md">
                            {item.name}
                          </Text>
                        </HStack>
                      </HStack>

                      <List spacing={1} ml={1}>
                        {item.items.map((child, childIndex) => (
                          <ListItem
                            key={childIndex}
                            display="flex"
                            alignItems="start"
                            fontSize="md"
                            color="gray.300"
                          >
                            <Box
                              mt="10px"
                              mr={3}
                              minW="6px"
                              h="6px"
                              bg="purple.400"
                              borderRadius="full"
                              boxShadow="0 0 8px var(--chakra-colors-purple-400)"
                            />
                            <Text lineHeight="1.6">{child}</Text>
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  ))}
                </VStack>
              </VStack>
              {updateData.images.length > 0 && <VStack>
                <Heading as="h2" color="purple.400" size="xl" textAlign="center">
                  Медиа
                </Heading>

                <Divider borderColor="bg.neutral" my={3} />

                <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
                  {updateData.images.map((image, index) => (
                    <Tooltip
                      key={index}
                      aria-label={image.name}
                      label={image.name}
                      hasArrow
                    >
                      <Image
                        src={image.url}
                        alt={image.name}
                        cursor="pointer"
                        transition="all 0.2s"
                        _hover={{
                          transform: 'scale(1.02)',
                        }}
                        onClick={() => handleImageOpen(image)}
                      />
                    </Tooltip>
                  ))}
                </SimpleGrid>
              </VStack>}
            </>
          )}
        </VStack>
      </Container>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="full"
        isCentered
        scrollBehavior="outside"
        blockScrollOnMount={true}
      >
        <ModalOverlay />

        <ModalContent
          bg="transparent"
          boxShadow="none"
          p={0}
          overflow="hidden"
          w="100%"
          h="100%"
        >
          <ModalCloseButton
            color="white"
            size="lg"
            zIndex={10}
            top={6}
            right={6}
          />

          {selectedImage && (
            <VStack
              spacing={2}
              height="100%"
              width="100%"
              justifyContent="center"
              alignItems="center"
              overflow="hidden"
              onClick={onClose}
            >
              <Text color="white" fontSize="lg" textShadow="1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000" mb={4}>
                {selectedImage.name}
              </Text>

              <Image
                src={selectedImage.url}
                alt={selectedImage.name}
                maxHeight="90%"
                maxWidth="95%"
                objectFit="contain"
                onClick={handleImageClick}
              />
            </VStack>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}