import {
    Box, Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer, Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Flex,
    Heading,
    Badge,
    Spacer,
} from "@chakra-ui/react";
import { ChevronDownIcon, NotAllowedIcon, CheckCircleIcon, CheckIcon } from '@chakra-ui/icons'
import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BASE_URL } from '../../base_url';
import { getTimeTaken } from '../../utils';
import Navbar from "../../components/Navbar";
import WebsiteFooter from '../../components/Footer';

function TransactionsPage() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    // const [data, setData] = useState(JSON.parse(localStorage.getItem('transactions')) || []);
    const [searchParama, setSearchParams] = useSearchParams();
    const status = searchParama.get('status');
    const [statusFilter, setStatusFilter] = useState(status || 'all');

    useEffect(() => {
        const getAllTransactions = async (status) => {
            try {
                const response = await axios.get(`${BASE_URL}/api/transactions?status=${status}`);
                // localStorage.setItem('transactions', JSON.stringify(response.data.data));
                setData(response.data.data);
                setSearchParams({ status });
            } catch (error) {
                console.log('error:', error)
            }
        }
        getAllTransactions(statusFilter);
    }, [statusFilter]);

    useEffect(() => {
        if (!status) {
            setSearchParams({ status: 'all' });
        }
    }, [])

    return (
        <Box bg='#F3F2EC' h='100vh' overflow='auto'>
            <Navbar />

            <Flex direction="column" h="full">

                <Box
                    w={{ base: '95%', sm: '90%' }}
                    maxW="container.xl"
                    m="auto"
                    my={10}
                    p={8}
                    borderRadius="xl"
                    boxShadow="dark-lg"
                    bgGradient="linear(to-br, white, gray.50)"
                >
                    {/* Header & Filter */}
                    <Flex justify="space-between" align="center" mb={6} flexWrap="wrap" gap={4}>
                        <Heading fontSize="2xl" color="blue.600">
                            💼 All Transactions
                        </Heading>

                        <Menu>
                            <MenuButton
                                colorScheme="blue"
                                rightIcon={<ChevronDownIcon />}
                                minW="140px"
                                initialFocusRef={false}
                                px={4}
                                py={2}
                                transition='all 0.2s'
                                borderRadius='md'
                                borderWidth='1px'
                                _hover={{ bg: 'gray.400' }}
                                _expanded={{ bg: 'blue.400' }}
                                _focus={{ boxShadow: 'outline' }}
                            >
                                {statusFilter === 'all'
                                    ? 'All'
                                    : statusFilter === 'success'
                                        ? 'Success'
                                        : statusFilter === 'cancelled'
                                            ? 'Cancelled'
                                            : 'Filter'}
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={() => setStatusFilter('all')}>
                                    <CheckIcon color="blue.500" mr={2} /> All
                                </MenuItem>
                                <MenuItem onClick={() => setStatusFilter('success')}>
                                    <CheckCircleIcon color="green.500" mr={2} /> Successful
                                </MenuItem>
                                <MenuItem onClick={() => setStatusFilter('cancelled')}>
                                    <NotAllowedIcon color="red.500" mr={2} /> Cancelled
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>

                    {/* Table */}
                    <TableContainer borderRadius="md" boxShadow="md" bg="white">
                        <Table variant="striped" colorScheme="gray" size={['sm', 'md']}>
                            <TableCaption placement="top" fontWeight="semibold" color="gray.700">
                                Transaction History
                            </TableCaption>
                            <Thead bg="blue.100">
                                <Tr>
                                    <Th>Sr.No</Th>
                                    <Th>Date & Time</Th>
                                    <Th>Order ID</Th>
                                    <Th>Order Amt</Th>
                                    <Th>Transaction Amt</Th>
                                    <Th>Payment Method</Th>
                                    <Th>Status</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {data.length > 0 &&
                                    data.map((order, index) => (
                                        <Tr
                                            key={order._id}
                                            _hover={{ bg: 'gray.50', boxShadow: 'md' }}
                                            transition="all 0.3s ease"
                                        >
                                            <Td>{index + 1}</Td>
                                            <Td>{getTimeTaken(order.payment_time)}</Td>
                                            <Td>{order.collect_id}</Td>
                                            <Td>₹{order.order_amount}</Td>
                                            <Td>₹{order.order_amount + 100}</Td>
                                            <Td>
                                                <Badge colorScheme="purple" fontSize="0.8em">
                                                    {(order.payment_mode).toUpperCase()}
                                                </Badge>
                                            </Td>
                                            <Td>
                                                <Badge
                                                    colorScheme={order.status === 'success' ? 'green' : 'red'}
                                                    fontSize="0.8em"
                                                >
                                                    {(order.status).toUpperCase()}
                                                </Badge>
                                            </Td>
                                        </Tr>
                                    ))}
                            </Tbody>
                        </Table>
                    </TableContainer>

                    {/* Action Button */}
                    <Flex justify="center" mt={8}>
                        <Button
                            colorScheme="teal"
                            size="md"
                            onClick={() => navigate('/create-payment')}
                        // leftIcon={<FaPlus />}
                        >
                            New Payment
                        </Button>
                    </Flex>
                </Box>

                <Spacer />
                <WebsiteFooter />
            </Flex>
        </Box>
    )
}

export default TransactionsPage