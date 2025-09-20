import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Box, Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer, Flex, Text, useDisclosure, Heading, Badge, Spacer } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import InformativeModal from '../../components/Modal';
import { BASE_URL } from '../../base_url';
import Navbar from '../../components/Navbar';
import { getTimeTaken } from '../../utils';
import WebsiteFooter from '../../components/Footer';

function PaymentStatus() {
    const { isOpen, onOpen, onClose } = useDisclosure(); // Drawer
    {/*  */ }
    const navigate = useNavigate();
    const [order, setOrder] = useState({});
    const [isError, setIsError] = useState(false);
    const data = JSON.parse(localStorage.getItem('full_response')) || {}; // this data is stored in localstorage by create-payment page
    const order_id = data?.data?.order_id;

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

        if(order_id && status) {
            fetchPaymentStatus(order_id, status);
        }
    }, [])

    return (isError ?
        <Flex w='fit-content' m='auto' direction='column' align='start' gap={2}>
            <Text fontSize='xl' color='red' textAlign='center' mt={5}>Please login</Text>
            <Button onClick={() => navigate('/')}>Login page</Button>
        </Flex> :
        <Box bg='#F3F2EC' h='100vh' overflow='auto'>
            {/*  */}
            <InformativeModal isOpen={isOpen} onClose={onClose} />
            {/*  */}
            <Navbar />
            {/*  */}

            <Flex direction="column" h="full">

                <Box
                    w={{ base: '95%', sm: '90%' }}
                    maxW="container.lg"
                    m="auto"
                    mt={10}
                    p={8}
                    borderRadius="xl"
                    boxShadow="dark-lg"
                    bgGradient="linear(to-br, white, gray.50)"
                >
                    {/* Modal Trigger */}
                    <Flex justify="flex-end">
                        <Button colorScheme="blue" onClick={onOpen} size={{ base: 'sm', md: 'md' }}>
                            ℹ️ Information
                        </Button>
                    </Flex>

                    {/* Header */}
                    <Heading fontSize="2xl" mt={6} color="blue.600" textAlign="center">
                        Payment Status Overview
                    </Heading>
                    <Text fontSize="sm" color="gray.600" textAlign="center" mt={2}>
                        Here is your latest transaction details.
                    </Text>

                    {/* Table */}
                    <TableContainer mt={8} borderRadius="md" boxShadow="md" bg="white">
                        <Table variant="striped" colorScheme="gray" size={['sm', 'md']}>
                            <TableCaption placement="bottom" fontWeight="semibold" color="gray.700">
                                Latest Payment Record
                            </TableCaption>
                            <Thead bg="gray.100">
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
                                {order?._id && (
                                    <Tr
                                        _hover={{ boxShadow: 'md', bg: 'gray.50' }}
                                        transition="all 0.3s ease"
                                    >
                                        <Td>{getTimeTaken(order?.createdAt) ?? 'N/A'}</Td>
                                        <Td>{order?._id ?? 'N/A'}</Td>
                                        <Td>₹{order?.order_amount ?? 'N/A'}</Td>
                                        <Td>₹{order?.order_amount && order?.order_amount + 100}</Td>
                                        <Td>
                                            <Badge colorScheme="purple" fontSize="0.8em">
                                                UPI
                                            </Badge>
                                        </Td>
                                        <Td>
                                            <Badge colorScheme={status === 'success' ? 'green' : 'red'} fontSize="0.8em">
                                                {status ?? 'N/A'}
                                            </Badge>
                                        </Td>
                                        <Td>{order?.student_info?.name ?? 'N/A'}</Td>
                                        <Td>{order?.student_info?.email ?? 'N/A'}</Td>
                                    </Tr>
                                )}
                            </Tbody>
                        </Table>
                    </TableContainer>

                    {/* Actions */}
                    <Flex
                        gap={4}
                        mt={10}
                        direction={{ base: 'column', sm: 'row' }}
                        justify="center"
                    >
                        <Button
                            colorScheme="teal"
                            onClick={() => navigate('/create-payment')}
                            size={{ base: 'sm', md: 'md' }}
                        >
                            💳 New Payment
                        </Button>
                        <Button
                            colorScheme="teal"
                            variant="outline"
                            onClick={() => navigate('/transactions')}
                            size={{ base: 'sm', md: 'md' }}
                        >
                            📄 All Transactions
                        </Button>
                    </Flex>
                </Box>

                <Spacer />

                <WebsiteFooter />
            </Flex>

        </Box>
    )
}

export default PaymentStatus;