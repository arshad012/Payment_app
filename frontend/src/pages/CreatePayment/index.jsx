import { Box, FormControl, FormLabel, Input, Heading, VStack, Stack, Button, InputLeftElement, InputGroup, Text, Flex, Skeleton, FormErrorMessage } from "@chakra-ui/react"
import { loginLocalStorageKey } from "../../utils"
import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { BASE_URL } from '../../base_url';
import Navbar from '../../components/Navbar'

function CreatePaymentPage() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState({
        lodingUserInfo: false,
        loadingPaymentLink: false
    });
    const [isError, setIsError] = useState(null);
    const [errors, setErrors] = useState({amount: ""});
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
        if(value === 0) {
            setAmount('');
            return
        }
        
        if(value <= 50000) {
            setErrors({amount: ''});
        } else {
            setErrors({amount: 'You can not send more than rupees 50,000'});
        }
        setAmount(value)
    }

    const handleSubmit = async e => {
        e.preventDefault();

        if(amount > 50000) {
            setErrors({amount: 'You can not send more than 50,000'});
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


    // loading.lodingUserInfo
    return (isError ?
        <Flex w='fit-content' m='auto' direction='column' align='start' gap={2}>
            <Text fontSize='xl' color='red' textAlign='center' mt={5}>{isError}</Text>
            <Button onClick={() => navigate('/')}>Login page</Button>
        </Flex> :
        <Box h='100vh' overflow='auto' bg='#F3F2EC'>
            {/*  */}
            <Navbar />
            {/*  */}
            <Box w={{ base: '95%', sm: '90%' }} m='auto' mt={5} p={6} borderRadius='lg' boxShadow='lg' bg='white'>
                <Heading fontSize='xl'>You are all set to make your  payments</Heading>

                <form onSubmit={handleSubmit}>
                    <VStack spacing={5} alignItems='start'>
                        <Stack direction={{ base: 'column', sm: 'row' }} spacing={5} mt={5} w='full'>
                            <FormControl>
                                <FormLabel>Name</FormLabel>
                                <Skeleton
                                    isLoaded={!loading.lodingUserInfo}
                                    fadeDuration={1}
                                    borderRadius='md'
                                >
                                    <Input
                                        type='text'
                                        name='name'
                                        boxShadow='sm'
                                        value={user?.name}
                                        isReadOnly
                                        size={{ base: 'sm', md: 'md' }}
                                    />
                                </Skeleton>
                            </FormControl>

                            <FormControl>
                                <FormLabel>Email</FormLabel>
                                <Skeleton
                                    isLoaded={!loading.lodingUserInfo}
                                    fadeDuration={1}
                                    borderRadius='md'
                                >
                                    <Input
                                        type='email'
                                        name='email'
                                        boxShadow='sm'
                                        value={user?.email}
                                        isReadOnly
                                        size={{ base: 'sm', md: 'md' }}
                                    />
                                </Skeleton>
                            </FormControl>
                        </Stack>
                        <FormControl isInvalid={errors.amount}>
                            <FormLabel>Amount</FormLabel>
                            <Skeleton
                                isLoaded={!loading.lodingUserInfo}
                                fadeDuration={1}
                                borderRadius='md'
                            >
                                <InputGroup size={{ base: 'sm', md: 'md' }}>
                                    <InputLeftElement pointerEvents='none' fontSize={{ base: '12px', md: '16px' }}>
                                        INR
                                    </InputLeftElement>
                                    <Input
                                        type='number'
                                        name='amount'
                                        boxShadow='sm'
                                        value={amount}
                                        onChange={handleChange}
                                        placeholder='Amount'
                                        size={{ base: 'sm', md: 'md' }}
                                    />
                                </InputGroup>
                                <FormErrorMessage>{errors.amount}</FormErrorMessage>
                            </Skeleton>
                        </FormControl>

                        <Flex gap={3}>
                            <Skeleton
                                isLoaded={!loading.lodingUserInfo}
                                fadeDuration={1}
                                borderRadius='md'
                            >
                                <Button
                                    type="submit"
                                    colorScheme="blue"
                                    isDisabled={amount <= 0 || amount > 50000 || loading.loadingPaymentLink}
                                    isLoading={loading.loadingPaymentLink}
                                    size={{ base: 'sm', md: 'md' }}
                                >Proceed
                                </Button>
                            </Skeleton>
                        </Flex>
                    </VStack>
                </form>
                {/*  */}
                <Skeleton
                    isLoaded={!loading.lodingUserInfo}
                    fadeDuration={1}
                    borderRadius='md'
                    mt={3}
                    w='fit-content'
                >
                    <Button
                        type="submit"
                        colorScheme="blue"
                        variant='outline'
                        isDisabled={loading.loadingPaymentLink}
                        size={{ base: 'sm', md: 'md' }}
                        onClick={() => navigate("/transactions")}
                    >All Transactions
                    </Button>
                </Skeleton>
            </Box>
        </Box>
    )
}

export default CreatePaymentPage