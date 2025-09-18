import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Box, Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer, Flex, Text, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import InformativeModel from '../../components/Modal';
import { BASE_URL } from '../../base_url';
import Navbar from '../../components/Navbar';
import { getTimeTaken } from '../../utils';

function PaymentStatus() {
    const { isOpen, onOpen, onClose } = useDisclosure(); // Drawer
    const btnRef = useRef();
    {/*  */ }
    const navigate = useNavigate();
    const [order, setOrder] = useState({});
    const [isError, setIsError] = useState(false);
    const data = JSON.parse(localStorage.getItem('full_response')) || {}; // this data is stored in localstorage by create-payment page
    const order_id = data.data.order_id;

    const [searchParams, setSearchParams] = useSearchParams();
    const status = searchParams.get('status') ? (searchParams.get('status')).toUpperCase() : '';
    const colorCode = status === 'SUCCESS' ? 'green' : status === 'CANCELLED' ? 'red' : 'blue';

    useEffect(() => {
        const fetchPaymentStatus = async (order_id, status) => {
            status = status.toLowerCase();
            try {
                const response = await axios.get(`${BASE_URL}/api/payment-status?order_id=${order_id}&updatedStatus=${status}`);
                // console.log('response:', response.data)
                setOrder(response.data.order);
            } catch (error) {
                console.log('error:', error.response);
                if (error.response.statusText == 'Unauthorized') {
                    setIsError(true);
                }
            }
        }

        fetchPaymentStatus(order_id, status);
    }, [])

    return (isError ?
        <Flex w='fit-content' m='auto' direction='column' align='start' gap={2}>
            <Text fontSize='xl' color='red' textAlign='center' mt={5}>Please login</Text>
            <Button onClick={() => navigate('/')}>Login page</Button>
        </Flex> :
        <Box bg='#F3F2EC' h='100vh' overflow='auto'>
            {/*  */}
            <InformativeModel isOpen={isOpen} onClose={onClose} />
            {/*  */}
            <Navbar />
            {/*  */}

            <Box w={{ base: '95%', sm: '90%' }} m='auto' mt={5} bg='white' p={5} borderRadius='lg' boxShadow='xl'>
                <Button colorScheme='blue' onClick={onOpen} size={{ base: 'sm', md: 'md' }}>
                    Information
                </Button>
                {/* above button is for Drawer and not related to this page but due to design requirements we put it in this file */}
                <TableContainer m='auto' mt={5} bg='white'>
                    <Table variant='simple' size={['sm', 'md']}>
                        <TableCaption>Payment status</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Date & Time</Th>
                                <Th>Order ID</Th>
                                <Th>Order Amt</Th>
                                <Th>Transaction Amt</Th>
                                <Th>Payment Method</Th>
                                <Th>Status</Th>
                                <Th>Student Name</Th>
                                <Th>Email</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {order?._id &&
                                <Tr _hover={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;' }} style={{ transition: 'all 0.5s' }}>
                                    <Td>{getTimeTaken(order?.createdAt) ?? 'N/A'}</Td>
                                    <Td>{order?._id ?? 'N/A'}</Td>
                                    <Td>{order?.order_amount ?? 'N/A'}</Td>
                                    <Td>{order?.order_amount && order?.order_amount + 100}</Td>
                                    <Td>UPI</Td>
                                    <Td color={colorCode}>{status ?? 'N/A'}</Td>
                                    <Td>{order?.student_info?.name ?? 'N/A'}</Td>
                                    <Td>{order?.student_info?.email ?? 'N/A'}</Td>
                                </Tr>
                            }
                        </Tbody>
                    </Table>
                </TableContainer>

                <Flex gap={3} mt={10} direction={{ base: 'column', sm: 'row' }} align={'start'}>
                    <Button
                        colorScheme="blue"
                        onClick={() => navigate('/create-payment')}
                        size={{ base: 'sm', md: 'md' }}
                    >New Payment
                    </Button>
                    <Button
                        colorScheme="blue"
                        variant='outline'
                        onClick={() => navigate('/transactions')}
                        size={{ base: 'sm', md: 'md' }}
                    >All transactions
                    </Button>
                </Flex>
            </Box>
        </Box>
    )
}

export default PaymentStatus