import {
    Box, Flex, Heading, Spacer, Button, IconButton, Avatar,
    Menu, MenuButton, MenuList, MenuItem, useDisclosure, Drawer,
    DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, VStack,
    Select, Text,
    DrawerCloseButton
} from "@chakra-ui/react";
import { HamburgerIcon, ChevronDownIcon, CheckIcon, CheckCircleIcon, NotAllowedIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const userInfo = JSON.parse(localStorage.getItem("upay-app-user-login-info"));

    const menuItems = [
        { label: "New Payment", path: "/create-payment" },
        { label: "Transactions", path: "/transactions" },
    ];

    const accountOptions = [
        { label: "Signup", value: "/signup" },
        { label: "Login", value: "/" },
    ];

    const handleClick = (path) => {
        navigate(path);
    };

    return (
        <Box
            bg="rgba(245, 238, 238, 0.7)"
            position="sticky"
            top={0}
            zIndex={1000}
            backdropFilter="blur(5px)"
        >
            <Flex
                h="60px"
                w={{ base: "95%", sm: "90%" }}
                m="auto"
                align="center"
            >
                <Heading fontSize="2xl" color="blue.600">U-Pay</Heading>
                <Spacer />

                {/* Desktop Menu */}
                <Flex display={{ base: "none", md: "flex" }} align="center" gap={4}>
                    {menuItems.map(item => (
                        <Button
                            key={item.label}
                            variant="link"
                            size="sm"
                            onClick={() => handleClick(item.path)}
                        >
                            {item.label}
                        </Button>
                    ))}

                    <Menu>
                        <MenuButton as={Button} variant="ghost" size="sm" rightIcon={<ChevronDownIcon />}>
                            New Account
                        </MenuButton>
                        <MenuList>
                            {accountOptions.map(opt => (
                                <MenuItem key={opt.value} onClick={() => handleClick(opt.value)}>
                                    {opt.label}
                                </MenuItem>
                            ))}
                        </MenuList>
                    </Menu>

                    <Menu>
                        <MenuButton as={Button} variant="link" size="sm">
                            <Avatar name={userInfo?.name ?? "N/A"} size="sm" ml={2} />
                        </MenuButton>
                        <MenuList px={2}>
                            <MenuItem _hover={{ cursor: "text" }}>Name - {userInfo?.name}</MenuItem>
                            <hr />
                            <MenuItem _hover={{ cursor: "text" }}>Email - {userInfo?.email}</MenuItem>
                            <hr />
                            <MenuItem _hover={{ cursor: "text" }}>ID - {userInfo?._id}</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>

                {/* Mobile Menu */}
                <IconButton
                    icon={<HamburgerIcon />}
                    variant="ghost"
                    size="lg"
                    display={{ base: "flex", md: "none" }}
                    onClick={onOpen}
                />
            </Flex>

            {/* Drawer for Mobile */}
            <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
                    <DrawerCloseButton />
                    <DrawerBody>
                        <VStack align="start" spacing={4}>
                            <Flex align="center" gap={3}>
                                <Avatar name={userInfo?.name ?? "N/A"} size="sm" />
                                <Box>
                                    <Text fontWeight="bold">{userInfo?.name}</Text>
                                    <Text fontSize="sm" color="gray.500">{userInfo?.email}</Text>
                                </Box>
                            </Flex>

                            {menuItems.map(item => (
                                <Button
                                    key={item.label}
                                    variant="ghost"
                                    w="full"
                                    onClick={() => {
                                        handleClick(item.path);
                                        onClose();
                                    }}
                                >
                                    {item.label}
                                </Button>
                            ))}

                            <Menu>
                                <MenuButton as={Button} variant="ghost" w="full" rightIcon={<ChevronDownIcon />}>
                                    New Account
                                </MenuButton>
                                <MenuList>
                                    {accountOptions.map(opt => (
                                        <MenuItem key={opt.value} onClick={() => handleClick(opt.value)}>
                                            {opt.label}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </Menu>
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Box>
    )
}

export default Navbar;