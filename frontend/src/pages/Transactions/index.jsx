import {
    Box, Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer, Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from "@chakra-ui/react";
import { ChevronDownIcon, NotAllowedIcon, CheckCircleIcon, CheckIcon } from '@chakra-ui/icons'
import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BASE_URL } from '../../base_url';
import { getTimeTaken } from '../../utils';
import Navbar from "../../components/Navbar";

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
            <Box w={{ base: '95%', sm: '90%' }} m='auto' mt={5} bg='white' p={5} borderRadius='lg' boxShadow='xl'>
                <Box h='60px' w={{ base: '95%', sm: '90%' }}>
                    <Menu>
                        <MenuButton
                            colorScheme="blue"
                            as={Button}
                            rightIcon={<ChevronDownIcon />}
                            minW='120px'
                            size={{ base: 'sm', md: 'md' }}
                        >
                            {statusFilter == 'all' ? 'All' :
                                statusFilter == 'success' ? "Success" :
                                    statusFilter == 'cancelled' ? 'Cancelled' : 'Filter'}
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={() => setStatusFilter('all')}>
                                <CheckIcon color='blue.500' mr={2} />All
                            </MenuItem>
                            <MenuItem onClick={() => setStatusFilter('success')}>
                                <CheckCircleIcon color='green' mr={2} />Successfull
                            </MenuItem>
                            <MenuItem onClick={() => setStatusFilter('cancelled')}>
                                <NotAllowedIcon color='red' mr={2} />Cancelled
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Box>
                <TableContainer mt={2}>
                    <Table variant='simple' size={['sm', 'md']}>
                        <TableCaption>All Payments status</TableCaption>
                        <Thead bg='blue.100' borderRadius='lg'>
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
                                    <Tr key={order._id} _hover={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;' }} style={{ transition: 'all 0.3s' }} borderRadius='xl'>
                                        <Td>{index + 1}</Td>
                                        <Td>{getTimeTaken(order.payment_time)}</Td>
                                        <Td>{order.collect_id}</Td>
                                        <Td>{order.order_amount}</Td>
                                        <Td>{order.order_amount + 100}</Td>
                                        <Td>{(order.payment_mode).toUpperCase()}</Td>
                                        <Td color={order.status == 'success' ? 'green' : order.status == 'cancelled' ? 'red' : 'blue'}>{(order.status).toUpperCase()}</Td>
                                    </Tr>
                                ))
                            }
                        </Tbody>
                    </Table>
                </TableContainer>

                <Button
                    colorScheme="blue"
                    my={5}
                    onClick={() => navigate('/create-payment')}
                    size={{ base: 'sm', md: 'md' }}
                >New Payment
                </Button>
            </Box>
        </Box>
    )
}

export default TransactionsPage