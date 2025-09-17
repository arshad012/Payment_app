import { Avatar, AvatarBadge, Box, Flex, Heading, Button, Spacer, Menu, MenuButton, MenuList, MenuItem, Show, Hide, IconButton, Select } from '@chakra-ui/react'
import { ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'

function Navbar() {
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('upay-app-user-login-info'));

    const handleClick = (path) => {
        navigate(path);
    }

    const handleChange = (e) => {
        const path = e.target.value;
        navigate(path);
    }

    return (
        <Box
            bgColor='rgba(245, 238, 238, 0.7)'
            position='sticky'
            top={0}
            left={0}
            zIndex={1000}
        >
            <Box
                h='60px'
                w={{ base: '95%', sm: '90%' }}
                m='auto'
                bgColor='rgba(245, 238, 238, 0.7)'
                backdropFilter='blur(5px)'
            >
                <Flex boxSize='full' align={'center'}>
                    <Heading fontSize={'2xl'}>U-Pay</Heading>
                    <Spacer />
                    <Hide below='sm'>
                        <Flex h='full' alignItems='center' gap={2}>
                            <Button
                                size={{ base: 'xs', sm: 'sm' }}
                                variant='link'
                                onClick={() => handleClick('/create-payment')}
                            >New Payment</Button>
                            <Button
                                size={{ base: 'xs', sm: 'sm' }}
                                variant='link'
                                onClick={() => handleClick('/transactions')}
                            >Transactions</Button>
                            <Menu autoSelect={false} closeOnSelect={false}>
                                <MenuButton
                                    as={Button}
                                    rightIcon={<ChevronDownIcon />}
                                    size={{ base: 'xs', sm: 'sm' }}
                                    variant='link'
                                >
                                    New Account
                                </MenuButton>
                                <MenuList>
                                    <MenuItem
                                        _hover={{ textDecoration: 'underline' }}
                                        onClick={() => handleClick('/signup')}
                                    >Signup
                                    </MenuItem>
                                    <MenuItem
                                        _hover={{ textDecoration: 'underline' }}
                                        onClick={() => handleClick('/')}
                                    >Login
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                            {/*  */}
                            <Menu autoSelect={false} closeOnSelect={false}>
                                <MenuButton
                                    as={Button}
                                    size={{ base: 'xs', sm: 'sm' }}
                                    variant='link'
                                >
                                    <Avatar size={{ base: 'sm', md: 'md' }} ml={5}></Avatar>
                                </MenuButton>
                                <MenuList px={2}>
                                    <MenuItem _hover={{ cursor: 'text' }}>Name - {userInfo?.name}</MenuItem>
                                    <hr />
                                    <MenuItem _hover={{ cursor: 'text' }}>Email - {userInfo?.email}</MenuItem>
                                    <hr />
                                    <MenuItem _hover={{ cursor: 'text' }}>ID - {userInfo?._id}</MenuItem>
                                </MenuList>
                            </Menu>
                        </Flex>
                    </Hide>
                    {/*  */}
                    <Show below='sm'>
                        <Menu autoSelect={false} closeOnSelect={false}>
                            <MenuButton
                                as={IconButton}
                                icon={<HamburgerIcon />}
                                size='lg'
                                variant='link'
                            >
                            </MenuButton>
                            <MenuList>
                                <MenuItem>
                                    <Avatar size={{ base: 'sm', md: 'md' }} mr={2}>
                                    </Avatar> {userInfo.name}
                                </MenuItem>
                                <hr />
                                <MenuItem _hover={{ cursor: 'text' }}>Name - {userInfo?.name}</MenuItem>
                                <MenuItem _hover={{ cursor: 'text' }}>Email - {userInfo?.email}</MenuItem>
                                <hr />
                                <MenuItem
                                    onClick={() => handleClick('/create-payment')}
                                >New Payment
                                </MenuItem>
                                {/*  */}
                                <MenuItem
                                    onClick={() => handleClick('/transactions')}
                                >Transactions
                                </MenuItem>
                                {/*  */}
                                <MenuItem>
                                    <Select
                                        variant='unstyled'
                                        size='md'
                                        placeholder='New Account'
                                        onChange={(e) => handleChange(e)}
                                    >
                                        <option value='/signup'>Signup</option>
                                        <option value='/'>Login</option>
                                    </Select>
                                </MenuItem>
                                {/*  */}
                            </MenuList>
                        </Menu>
                    </Show>
                    {/*  */}
                </Flex>
            </Box>
        </Box>
    )
}

export default Navbar

{/* <Menu>
                                    <MenuButton
                                        as={Button}
                                        rightIcon={<ChevronDownIcon />}
                                        size={{ base: 'xs', sm: 'sm' }}
                                        variant='link'
                                    >
                                        New Account
                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem>Signup</MenuItem>
                                        <MenuItem>Login</MenuItem>
                                    </MenuList>
                                </Menu> */}