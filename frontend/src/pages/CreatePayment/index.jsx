import { Box, FormControl, FormLabel, Input, Heading, VStack, Stack, Button, InputLeftElement, InputGroup, Text, Flex, Skeleton, FormErrorMessage, Divider, Avatar, HStack, Spacer } from "@chakra-ui/react"
import { loginLocalStorageKey } from "../../utils"
import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { BASE_URL } from '../../base_url';

import Navbar from '../../components/Navbar'
import WebsiteFooter from "../../components/Footer";

function CreatePaymentPage() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState({
        lodingUserInfo: false,
        loadingPaymentLink: false
    });
    const [isError, setIsError] = useState(null);
    const [errors, setErrors] = useState({ amount: "" });
    const loginToken = localStorage.getItem(loginLocalStorageKey);

    useEffect(() => {
        setLoading(prev => ({ ...prev, lodingUserInfo: true }));

        const fetchUserInfo = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/user/profile`, {
                    headers: {
                        Authorization: `Bearer ${loginToken}`
                    }
                })
                setUser(response.data.user);
                setLoading(prev => ({ ...prev, lodingUserInfo: false }));
            } catch (error) {
                console.log('Could not fetch user info. try again', error.message);
                setIsError(error.response.data.message);
                setLoading(prev => ({ ...prev, lodingUserInfo: false }));
            }
        }

        setTimeout(() => {
            fetchUserInfo();
        }, 2000)
    }, [])

    const handleChange = e => {
        const value = Number(e.target.value);
        if (value === 0) {
            setAmount('');
            return
        }

        if (value <= 50000) {
            setErrors({ amount: '' });
        } else {
            setErrors({ amount: 'You can not send more than rupees 50,000' });
        }
        setAmount(value)
    }

    const handleSubmit = async e => {
        e.preventDefault();

        if (amount > 50000) {
            setErrors({ amount: 'You can not send more than 50,000' });
            return;
        }

        try {
            setLoading(prev => ({ ...prev, loadingPaymentLink: true }));
            const response = await axios.post(`${BASE_URL}/api/create-payment`,
                {
                    student_info: user,
                    amount
                },
                {
                    headers: {
                        Authorization: `Bearer ${loginToken}`,
                    }
                }
            )

            // console.log('response:', response)
            localStorage.setItem('full_response', JSON.stringify(response)); // this data will be used in payment-status page.

            setLoading(prev => ({ ...prev, loadingPaymentLink: false }));
            window.location.href = response.data.payment_url;
        } catch (error) {
            console.log('error while processing payment:', error);
            setLoading(prev => ({ ...prev, loadingPaymentLink: false }));
        }
    }


    return (isError ?
        <Flex w='fit-content' m='auto' direction='column' align='start' gap={2}>
            <Text fontSize='xl' color='red' textAlign='center' mt={5}>{isError}</Text>
            <Button onClick={() => navigate('/')}>Login page</Button>
        </Flex> :
        <Box h='100vh' overflow='auto' bg='#F3F2EC'>
            {/*  */}
            <Navbar />
            {/*  */}
            <Flex direction="column" h="full">
            <Box
                maxW="container.md"
                w={{ base: '95%', sm: '90%' }}
                m="auto"
                mt={10}
                p={8}
                borderRadius="xl"
                boxShadow="dark-lg"
                bgGradient="linear(to-br, white, gray.50)"
            >
                <VStack spacing={6} align="stretch">
                    <Heading fontSize="2xl" textAlign="center" color="blue.600">
                        🎉 You’re all set to make your payments!
                    </Heading>

                    <Box
                        bg="gray.100"
                        p={4}
                        borderRadius="md"
                        boxShadow="md"
                        textAlign="center"
                    >
                        <Text fontSize="sm" color="gray.700">
                            Empowering education, one transaction at a time. Let’s make it smooth and secure.
                        </Text>
                    </Box>

                    <form onSubmit={handleSubmit}>
                        <VStack spacing={5} align="stretch">
                            <Box
                                bg="gray.100"
                                p={5}
                                borderRadius="md"
                                boxShadow="md"
                                display="flex"
                                alignItems="center"
                                gap={4}
                            >
                                <Skeleton isLoaded={!loading.lodingUserInfo} borderRadius="full">
                                    <Avatar name={user?.name} size="lg" />
                                </Skeleton>
                                <Skeleton isLoaded={!loading.lodingUserInfo}>
                                    <Box>
                                        <Text fontSize="lg" fontWeight="bold" color="gray.800">
                                            {user?.name || "User Name"}
                                        </Text>
                                        <Text fontSize="sm" color="gray.600">
                                            {user?.email || "user@example.com"}
                                        </Text>
                                    </Box>
                                </Skeleton>
                            </Box>

                            <FormControl isInvalid={errors.amount}>
                                <FormLabel>Amount</FormLabel>
                                <Skeleton isLoaded={!loading.lodingUserInfo} borderRadius="md">
                                    <InputGroup size="md">
                                        <InputLeftElement pointerEvents="none" fontSize="md" color="gray.500">
                                            INR
                                        </InputLeftElement>
                                        <Input
                                            type="number"
                                            name="amount"
                                            value={amount}
                                            onChange={handleChange}
                                            placeholder="Enter amount"
                                            bg="white"
                                            boxShadow="sm"
                                        />
                                    </InputGroup>
                                    <FormErrorMessage>{errors.amount}</FormErrorMessage>
                                </Skeleton>
                            </FormControl>

                            <Flex justify="center" gap={4}>
                                <Skeleton isLoaded={!loading.lodingUserInfo} borderRadius="md">
                                    <Button
                                        type="submit"
                                        colorScheme="teal"
                                        size="md"
                                        isDisabled={amount <= 0 || amount > 50000 || loading.loadingPaymentLink}
                                        isLoading={loading.loadingPaymentLink}
                                    >
                                        Proceed
                                    </Button>
                                </Skeleton>

                                <Skeleton isLoaded={!loading.lodingUserInfo} borderRadius="md">
                                    <Button
                                        variant="outline"
                                        colorScheme="teal"
                                        size="md"
                                        isDisabled={loading.loadingPaymentLink}
                                        onClick={() => navigate("/transactions")}
                                    >
                                        All Transactions
                                    </Button>
                                </Skeleton>
                            </Flex>
                        </VStack>
                    </form>

                    <Divider my={6} />

                    <Box textAlign="center">
                        <Text fontSize="sm" color="gray.500">
                            Need help or have questions? Visit our{" "}
                            <Button variant="link" colorScheme="blue" onClick={() => navigate("/support")}>
                                Support Center
                            </Button>
                        </Text>
                    </Box>
                </VStack>
            </Box>

            <Spacer />
            
            <WebsiteFooter />
            </Flex>
        </Box>
    )
}

export default CreatePaymentPage;