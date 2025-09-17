import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, Box, VStack, Button, InputGroup, InputRightElement, Text, useToast, textDecoration, Flex } from '@chakra-ui/react'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import UserRoll from './userRoll'
import { validateEmail, validateName, validatePassword } from '../../validators'
import { BASE_URL } from '../../base_url'

function SignupPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        roll: 'Trustee',
        password: '',
        school_id: ''
    })
    const [errors, setErrors] = useState({
        name: null,
        email: null,
        roll: null,
        password: null,
        confirmPassword: null
    })
    const [show, setShow] = useState({
        password: false,
        confirmPassword: false
    });
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const validateAllInputFields = () => {
        const tempErrors = {};

        if (!formData.name) {
            tempErrors.name = 'Name is required'
        } else {
            if (!validateName(formData.name)) tempErrors.name = 'Name seems not correct';
        }

        if (!formData.email) {
            tempErrors.email = 'Invalid email';
        } else {
            if (!validateEmail(formData.email)) tempErrors.email = 'Invalid email';
        }

        if (!formData.password) {
            tempErrors.password = 'Invalid password';
        } else {
            if (!validatePassword(formData.password)) tempErrors.password = 'Password must have atleast one Uppercase, Lowercase, special character and number';
        }

        if (!formData.confirmPassword) {
            tempErrors.confirmPassword = 'Password not matched';
        } else {
            if (formData.password !== formData.confirmPassword) tempErrors.confirmPassword = 'Password not matched';
        }

        return tempErrors;
    }

    const validateInputField = (name, value) => {
        let error = null;

        switch (name) {
            case 'email': {
                if (!validateEmail(value)) error = 'Invalid email';
            }
                break;
            case 'password': {
                if (!validatePassword(value)) error = 'Password must have atleast one Uppercase, Lowercase, special character and number';
            }
                break;
            default:
                null;
        }

        setErrors(prev => ({ ...prev, [name]: error }));
    }


    const handleChange = e => {
        const value = e.target.value
        const name = e.target.name
        setFormData({ ...formData, [name]: value });

        validateInputField(name, value);
    }

    const handleSubmit = async e => {
        e.preventDefault();

        const tempErrors = validateAllInputFields();
        const errorsCount = Object.keys(tempErrors).length;
        if (errorsCount != 0) {
            setErrors(tempErrors);
            return;
        }


        try {
            delete formData.confirmPassword // deleting confirmPassword key because DB don't need this
            setLoading(true);

            const res = await fetch(`${BASE_URL}/auth/signup`, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'content-Type': 'application/json'
                }
            })
            const data = await res.json();
            if (!data.success && data.message.includes('11000')) {
                throw new Error('This email id already registered, Try with another email')
            } else if (!data.success) {
                throw new Error(data.message);
            }// if error occurs then try block will terminate here

            // console.log('data:', data);

            toast({
                title: 'Signup successfull.',
                description: "We have created an account for you",
                status: 'success',
                position: 'top',
                duration: 2000,
                isClosable: true,
            })

            setTimeout(() => {
                navigate('/');
            }, 2000)

        } catch (error) {
            console.log('error:', error)

            setErrors(prev => ({ ...prev, email: error.message }));
            setLoading(false);

            toast({
                title: error.message,
                description: 'Please try again',
                status: 'error',
                position: 'top',
                duration: 2000,
                isClosable: true,
            })
        }
    }

    const handleRadioChange = (value) => {
        setFormData({ ...formData, ['roll']: value });
    }

    return (
        <Box h='100vh' overflow='auto' bg='#F3F2EC'>
            <Box w={{ base: '90%', sm: '400px', md: '450px' }} m='auto' my={5} p={6} boxShadow='lg' border='1px solid gray' borderRadius='xl' bg='white'>
                <form onSubmit={handleSubmit}>
                    <VStack spacing={4}>

                        <Text fontSize='2xl' fontWeight='bold'>Sign up</Text>

                        <FormControl isInvalid={errors.name}>
                            <FormLabel>Your Name</FormLabel>
                            <Input
                                type='text'
                                name='name'
                                boxShadow='sm'
                                value={formData.name}
                                onChange={handleChange}
                            />
                            {errors.name && <FormErrorMessage>{errors.name}</FormErrorMessage>}
                        </FormControl>

                        <FormControl isInvalid={errors.email}>
                            <FormLabel>Your Email</FormLabel>
                            <Input
                                type='email'
                                name='email'
                                boxShadow='sm'
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {!errors.email ? (
                                <FormHelperText>We'll never share your email.</FormHelperText>
                            ) : (
                                <FormErrorMessage>{errors.email}</FormErrorMessage>
                            )
                            }
                        </FormControl>

                        <FormControl>
                            <FormLabel>You are signing up as:</FormLabel>
                            <InputGroup>
                                <UserRoll onChange={handleRadioChange} />
                            </InputGroup>
                            <FormHelperText>If you don't select any roll then default roll will be Trustee</FormHelperText>
                        </FormControl>

                        <FormControl isInvalid={errors.password}>
                            <FormLabel>Create password</FormLabel>
                            <InputGroup>
                                <Input
                                    type={show.password ? 'text' : 'password'}
                                    name='password'
                                    boxShadow='sm'
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <InputRightElement width='4.5rem'>
                                    <Button
                                        h='1.75rem'
                                        size='sm'
                                        onClick={() => setShow(prev => ({ ...prev, password: !show.password }))}
                                    >{show.password ? 'Hide' : 'Show'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            {!errors.password ? (
                                <FormHelperText>Password must be atleast 6 characters</FormHelperText>
                            ) : (
                                <FormErrorMessage>{errors.password}</FormErrorMessage>
                            )
                            }
                        </FormControl>

                        <FormControl isInvalid={errors.confirmPassword}>
                            <FormLabel>Confirm password</FormLabel>
                            <InputGroup>
                                <Input
                                    type={show.confirmPassword ? 'text' : 'password'}
                                    name='confirmPassword'
                                    boxShadow='sm'
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                                <InputRightElement width='4.5rem'>
                                    <Button
                                        h='1.75rem'
                                        size='sm'
                                        onClick={() => setShow(prev => ({ ...prev, confirmPassword: !show.confirmPassword }))}
                                    >{show.confirmPassword ? 'Hide' : 'Show'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            {errors.confirmPassword && <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>}
                        </FormControl>

                        <Button type='submit' w='full' colorScheme='blue' mt={5} _hover={{ textDecoration: 'underline' }} isLoading={loading}>Submit</Button>

                        <Flex gap='2' mt={5}>
                            <Text display='flex' gap='2'>Already have an account?</Text>
                            <Text color='blue' _hover={{ textDecoration: 'underline' }}>
                                <Link to='/'>Sign in</Link>
                            </Text>
                        </Flex>
                    </VStack>
                </form>
            </Box>
        </Box>
    )
}

export default SignupPage