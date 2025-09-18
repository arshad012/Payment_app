import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";
import { replace, useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/create-payment", {replace: true})
    }

    return (
        <Box
            minH="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="gray.50"
            px={6}
        >
            <VStack spacing={6} textAlign="center">
                <Heading fontSize="6xl" color="red.400">
                    404
                </Heading>
                <Text fontSize="xl" color="gray.600">
                    Oops! The page you're looking for doesn't exist.
                </Text>
                <Button 
                    colorScheme="blue" 
                    size={{base: 'md', sm: "lg"}}
                    onClick={handleClick}
                >
                    Go back home
                </Button>
            </VStack>
        </Box>
    )
}

export default NotFound
