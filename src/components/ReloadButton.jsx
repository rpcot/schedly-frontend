import { Button } from "@chakra-ui/react";

export default function ({ setRetryCount }) {
  const handleClick = () => {
    setRetryCount(c => c + 1);
  };

  return <Button
    w="fit-content"
    bg="purple.600"
    _hover={{
      bg: 'purple.500'
    }}
    _active={{
      bg: 'purple.600'
    }}
    _focusVisible={{
      outline: 'none',
      boxShadow: `0 0 0 3px var(--chakra-colors-purple-500)`,
    }}
    color="text.DEFAULT"
    fontWeight="medium"
    onClick={handleClick}
    transition="all 0.2s"
  >
    Перезагрузить
  </Button>
}