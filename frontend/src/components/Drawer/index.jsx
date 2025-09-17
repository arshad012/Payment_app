import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    Box,
    Text,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Highlight,
    List,
    ListItem,
    ListIcon,
    Image,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Badge,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

function InformativeDrawer({ btnRef, isOpen, onClose, isOpenModal, onOpenModal, onCloseModal }) {
    return (
        <>
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                finalFocusRef={btnRef}
                size={{ base: 'full', sm: 'sm' }}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Webhook Integration information</DrawerHeader>

                    <DrawerBody>
                        <Text fontSize='lg' fontWeight='semibold'>Hello there</Text>
                        <List spacing={3}>
                            <ListItem fontSize={{ base: 'sm', md: 'sm' }} lineHeight={1.6}>
                                <ListIcon as={CheckCircleIcon} color='teal.300' />
                                I will complete in few lines
                            </ListItem>
                            <ListItem fontSize={{ base: 'sm', md: 'sm' }} lineHeight={1.6}>
                                <ListIcon as={CheckCircleIcon} color='teal.300' />
                                As document of this project tells that we need to create a webhook POST route with the endpoint
                                <Highlight query='/webhook' styles={{ px: '2', py: '1', rounded: 'md', bg: 'teal.100' }}> /webhook </Highlight>
                                and that will be called by payment gateway which is a server to server call.
                            </ListItem>
                            <ListItem fontSize={{ base: 'sm', md: 'sm' }} lineHeight={1.6}>
                                <ListIcon as={CheckCircleIcon} color='teal.300' />
                                Due to paymeny gatewat is not calling
                                <Highlight query='/webhook' styles={{ px: '2', py: '1', rounded: 'md', bg: 'teal.100' }}> /webhook </Highlight>
                                We need
                                <Highlight query='ngrok' styles={{ px: '2', py: '1', rounded: 'md', bg: 'teal.100' }}> ngrok </Highlight>
                                to do that work.
                            </ListItem>
                            <ListItem fontSize={{ base: 'sm', md: 'sm' }}>
                                <ListIcon as={CheckCircleIcon} color='teal.300' />
                                After making a payment you will be redirected to payment-status page
                            </ListItem>
                            <ListItem fontSize={{ base: 'sm', md: 'sm' }}>
                                <ListIcon as={CheckCircleIcon} color='teal.300' />
                                Copy the 
                                <Highlight query='ORDER ID' styles={{ px: '2', py: '1', rounded: 'md', bg: 'teal.100' }}> ORDER ID </Highlight>
                                ID and pase it in potman data and hit send
                            </ListItem>
                            <ListItem fontSize={{ base: 'sm', md: 'sm' }}>
                                <ListIcon as={CheckCircleIcon} color='teal.300' />
                                Come back and refresh the page and see all transactions
                            </ListItem>
                            <ListItem fontSize={{ base: 'sm', md: 'sm' }}>
                                <ListIcon as={CheckCircleIcon} color='teal.300' />
                                See the example to use postman below
                            </ListItem>
                        </List>

                        <Accordion mt={5} allowMultiple>
                            <AccordionItem>
                                <h2>
                                    <AccordionButton _expanded={{ bg: 'blue.400', color: 'white' }}>
                                        <Box as='span' flex='1' textAlign='left'>
                                            <Text fontWeight='semibold'>Postman needs</Text>
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel>
                                    <Box>
                                        <Image
                                            src='../../../postman_data.png'
                                            alt='Post dummy data'
                                            w='full'
                                            cursor='pointer'
                                            onClick={onOpenModal}
                                        />
                                    </Box>
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>

                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant='outline' colorScheme='blue' mr={3} onClick={onClose} size={{ base: 'sm', md: 'md' }}>
                            Got it
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

            <>
                <Modal isOpen={isOpenModal} onClose={onCloseModal} size='xl'>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>
                            <Text>"Order_id" must be unique each time
                                <Badge ml='1' fontSize='0.8em' colorScheme='green'>
                                    Super Important
                                </Badge>
                            </Text>
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Image
                                src='../../../postman_data.png'
                                alt='Post dummy data'
                                w='full'
                                cursor='pointer'
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Text>After making a payment, copy the unique ID of the order from DB and paste it in "order_id"</Text>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        </>
    )
}


export default InformativeDrawer;