import { Box, Button, Flex, HStack, Text } from "@chakra-ui/react"

function WebsiteFooter() {
    return (
        <Box
            as="footer"
            w="full"
            mt={10}
            py={10}
            px={4}
            bg="gray.100"
            borderTop="1px solid"
            borderColor="gray.200"
        >
            <Flex
                direction={{ base: "column", sm: "row" }}
                justify="space-between"
                align="center"
                maxW="container.md"
                m="auto"
                gap={3}
            >
                <Text fontSize="sm" color="gray.600">
                    © {new Date().getFullYear()} EduPay. All rights reserved.
                </Text>

                <HStack spacing={4}>
                    <Button variant="link" colorScheme="blue" size="sm" onClick={() => alert("About page is under maintanance")}>
                        About
                    </Button>
                    <Button variant="link" colorScheme="blue" size="sm" onClick={() => alert("Suppport page is under maintanance")}>
                        Support
                    </Button>
                    <Button variant="link" colorScheme="blue" size="sm" onClick={() => alert("Privacy feature is under maintanance")}>
                        Privacy
                    </Button>
                </HStack>
            </Flex>
        </Box>
    )
}

export default WebsiteFooter
