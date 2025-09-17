import { Box, Skeleton, HStack, VStack } from "@chakra-ui/react"

function Loading() {
    return (
        <Box h='100vh' overflow='auto' bg='F5EFE6'>
            <Box w='90%' m='auto' mt={10} boxShadow='lg' borderRadius='lg' p={5}>
                <VStack spacing={5}>
                    <HStack w='100%' justify='center' spacing={5}>
                        <Skeleton h='40px' flex={1}/>
                        <Skeleton h='40px' flex={1}/>
                    </HStack>
                    <Skeleton h='40px' w='full' />
                </VStack>
            </Box>
        </Box>
    )
}

export default Loading
{/* <Text fontSize='3xl' textAlign='center'>Loading...</Text> */}