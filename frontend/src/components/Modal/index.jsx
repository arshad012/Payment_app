import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    VStack,
    Box,
    Button,
    Text
} from '@chakra-ui/react';

function InformativeModal({ isOpen, onClose }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
            <ModalOverlay />
            <ModalContent borderRadius="xl" boxShadow="2xl" bg="white">
                <ModalHeader fontSize="2xl" fontWeight="bold" color="blue.600">
                    Project Overview
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={4} align="start">
                        <Text fontSize="md" color="gray.700">
                            👋 Hi! This modal is here to help interviewers quickly understand the context of this project.
                        </Text>

                        <Box bg="gray.100" p={4} borderRadius="md" w="full">
                            <Text fontWeight="semibold" color="gray.800">Project Name:</Text>
                            <Text color="gray.600">School Payment Application</Text>
                        </Box>

                        <Box bg="gray.100" p={4} borderRadius="md" w="full">
                            <Text fontWeight="semibold" color="gray.800">Tech Stack:</Text>
                            <Text color="gray.600">MongoDB, Express, React, Chakra UI</Text>
                        </Box>

                        <Box bg="gray.100" p={4} borderRadius="md" w="full">
                            <Text fontWeight="semibold" color="gray.800">Role:</Text>
                            <Text color="gray.600">Full-stack Developer — handled backend APIs, frontend UI, deployment, and error handling</Text>
                        </Box>

                        <Box bg="gray.100" p={4} borderRadius="md" w="full">
                            <Text fontWeight="semibold" color="gray.800">Current Status:</Text>
                            <Text color="gray.600">Project deployed and stable. Final touches on API reliability and user experience.</Text>
                        </Box>

                        <Text fontSize="sm" color="gray.500" mt={2}>
                            This modal is not part of the user-facing app — it's just here to give info about the app to the respectable interviewers during review.
                        </Text>
                    </VStack>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" onClick={onClose}>
                        Got it
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}


export default InformativeModal;