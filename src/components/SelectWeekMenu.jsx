import { Button, Icon, Menu, MenuButton, MenuItem, MenuList, Spinner } from "@chakra-ui/react";
import { MdArrowDropDown } from "react-icons/md";

export default function SelectWeekMenu({ selectedWeek, weeksData, onChange, isLoading, isError }) {
  return (
    <Menu style={{ marginLeft: 'auto' }} isLazy={true}>
      {({ isOpen, onClose }) => (
        <>
          <MenuButton
            isActive={isOpen}
            isDisabled={isLoading || isError}
            as={Button}
            rightIcon={<Icon as={MdArrowDropDown} />}
            variant="outline"
            color="white"
            backgroundColor="gray.800"
            borderColor="gray.700"
            w="auto"
            sx={{
              '& .chakra-icon': {
                transition: 'transform 0.2s ease-in-out',
              }
            }}
            _expanded={{
              borderColor: 'purple.400',
              '& .chakra-icon': {
                transform: 'rotate(180deg)',
              }
            }}
            _hover={{ borderColor: 'purple.400' }}
            _active={{ borderColor: 'purple.400' }}
            _focusVisible={{
              outline: 'none',
              boxShadow: `0 0 0 3px var(--chakra-colors-purple-500)`,
            }}
          >
            {(selectedWeek?.date && !isError) && selectedWeek.date}
            {isError && 'Выберите неделю'}
            {(!selectedWeek?.date && !isError) && <Spinner color='purple.400' size="lg" m={4} />}
          </MenuButton>
          <MenuList
            bg="gray.800"
            borderColor="gray.700"
            color="white"
            minW="fit-content"
            maxH="300px"
            overflowY="auto"
          >
            {!!weeksData?.length && weeksData.map((week, index) => (
              <MenuItem
                key={index}
                bg={index % 2 === 0 ? 'gray.800' : 'gray.900'}
                border={index === 2 ? "1px" : null}
                borderColor={index === 2 ? "purple.400" : null}
                isDisabled={week.number === selectedWeek.number}
                _hover={{ bg: week.number !== selectedWeek.number ? 'gray.700' : null }}
                onClick={() => {
                  onChange(week);
                  onClose();
                }}
              >
                {week.date}
              </MenuItem>
            ))}
            {!weeksData?.length && <Spinner color='purple.400' size="lg" m={4} />}
          </MenuList>
        </>
      )}
    </Menu>
  )
}