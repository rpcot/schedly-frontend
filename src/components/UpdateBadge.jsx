import { Badge } from "@chakra-ui/react";

export default function UpdateBadge({ children, type, ...props }) {
  let bg = "purple.300";
  switch (type) {
    case 'major':
      bg = "purple.300";
      break;
    case 'hotfix':
      bg = "red.400";
      break;
    default:
      bg = "gray.400";
  }
  return <Badge
    bg={bg}
    {...props}
    rounded="15px"
    py={0.5}
    px={2}
    fontSize="xs"
    color="gray.800"
  >
    {children}
  </Badge>;
}