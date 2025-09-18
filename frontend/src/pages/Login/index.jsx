import { FormControl, FormLabel, FormErrorMessage, Input, Box, VStack, InputGroup, InputRightElement, Button, Text, useToast, Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { validateEmail } from '../../validators';
import { loginLocalStorageKey } from '../../utils';
import { BASE_URL } from '../../base_url';

function LoginPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const toast = useToast();

    const validateAllInputFields = () => {
        const tempErrors = {};

        if (!formData.email) {
            tempErrors.email = 'Email is required';
        } else {
            if (!validateEmail(formData.email)) tempErrors.email = 'Invalid email';
        }

        if (!formData.password) tempErrors.password = 'Password is required';

        return tempErrors;
    }

    const validateInputField = (name, value) => {
        let tempErrors = {};

        switch (name) {
            case 'email':
                if (!validateEmail(value)) tempErrors.email = 'Invalid email';
                else tempErrors.email = null;
                break;
            case 'password':
                if (!value) tempErrors.password = '';
                else tempErrors.password = null;
                break;
            default:
                null;
        }

        setErrors(prev => ({ ...prev, ...tempErrors }));
    }

    const handleChange = e => {
        const name = e.target.name
        const value = e.target.value
        validateInputField(name, value);
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async e => {
        e.preventDefault();

        const tempErrors = validateAllInputFields();
        const errorsCount = Object.keys(tempErrors).length;
        if (errorsCount != 0) {
            setErrors(tempErrors);
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(`${BASE_URL}/auth/login`, 
                {
                    email: formData.email,
                    password: formData.password
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            // console.log('data:', response.data)

            localStorage.setItem(loginLocalStorageKey, response.data.token);
            localStorage.setItem('upay-app-user-login-info', JSON.stringify(response.data.user));

            setErrors({});

            toast({
                title: 'Login successfull.',
                description: "Please wait...",
                status: 'success',
                position: 'top',
                duration: 2000,
                isClosable: true,
            })

            setTimeout(() => {
                navigate('/create-payment');
            }, 2000)

        } catch (error) {
            console.log('error:', error.response);
            if (error.response.data.message === 'Wrong password') {
                setErrors({ password: 'Wrong password' });
            } else if (error.response.data.message === 'User not found') {
                setErrors({ email: 'User not found' });
            }

            toast({
                title: error.response.data.message,
                description: 'Please try again',
                status: 'error',
                position: 'top',
                duration: 5000,
                isClosable: true,
            })
        } finally {
            setLoading(false);
        }
    }

    return (
        <Box
            h='100vh'
            overflow='auto'
            bgImage="url('../../login_bg_img.jpg')"
            bgPosition="center"
            bgRepeat="no-repeat"
            bgSize='cover'
        >
            <Box w={['90%', '400px', '450px']} m='auto' my={5} p={6} boxShadow='lg' border='1px solid gray' borderRadius='xl' bg='transparent' backdropFilter='blur(10px)'>
                <form onSubmit={handleSubmit}>
                    <VStack>
                        <VStack spacing={0}>
                            <Text fontSize='2xl' fontWeight='bold'>Login</Text>
                            <Text>Enter your credentials</Text>
                        </VStack>

                        <FormControl isInvalid={errors.email}>
                            <FormLabel>Email ID</FormLabel>
                            <Input
                                type='email'
                                name='email'
                                borderColor='black'
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <FormErrorMessage>{errors.email}</FormErrorMessage>}
                        </FormControl>

                        <FormControl isInvalid={errors.password}>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    name='password'
                                    borderColor='black'
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <InputRightElement width='4.5rem'>
                                    <Button
                                        h='1.75rem'
                                        size='sm'
                                        colorScheme='blue'
                                        onClick={() => setShowPassword(!showPassword)}
                                    >{showPassword ? 'Hide' : 'Show'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            {errors.password && <FormErrorMessage>{errors.password}</FormErrorMessage>}
                        </FormControl>

                        <Button
                            type='submit'
                            w='full'
                            colorScheme='blue'
                            mt={10}
                            isLoading={loading}
                        >Login
                        </Button>

                        <Flex gap='2' mt={5}>
                            <Text display='flex' gap='2'>Don't have an account?</Text>
                            <Text color='blue' _hover={{ textDecoration: 'underline' }}>
                                <Link to='/signup'>Sign up</Link>
                            </Text>
                        </Flex>
                    </VStack>

                </form>
            </Box>
        </Box>
    )
}

export default LoginPage