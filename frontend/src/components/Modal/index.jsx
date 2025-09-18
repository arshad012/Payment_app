import {
    Highlight,
    List,
    ListItem,
    ListIcon,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

function InformativeModel({ isOpen, onClose }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size='xl'>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    Order status & Webhook Integration information
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {/* <Image
                                src='../../../postman_data.png'
                                alt='Post dummy data'
                                w='full'
                                cursor='pointer'
                            /> */}
                    <List spacing={3}>
                        <ListItem fontSize={{ base: 'sm', md: 'sm' }} lineHeight={1.6}>
                            <ListIcon as={CheckCircleIcon} color='teal.300' />
                            I will complete in few lines
                        </ListItem>

                        <ListItem fontSize={{ base: 'sm', md: 'sm' }} lineHeight={1.6}>
                            <ListIcon as={CheckCircleIcon} color='teal.300' />
                            As our payment gateway is not calling the
                            <Highlight
                                query={'/webhook'}
                                styles={{ px: '2', py: '1', rounded: 'full', bg: 'teal.100' }}>/webhook
                            </Highlight>
                            route, so i decide to update order status and create webhook
                            for relavent order in payment-status page itself.
                        </ListItem>

                        <ListItem fontSize={{ base: 'sm', md: 'sm' }}>
                            <ListIcon as={CheckCircleIcon} color='teal.300' />
                            After making a payment you will be redirected to payment-status page
                            with the updated information.
                        </ListItem>

                        <ListItem fontSize={{ base: 'sm', md: 'sm' }}>
                            <ListIcon as={CheckCircleIcon} color='teal.300' />
                            Finally you can see all orders on
                            <Highlight
                                query={'All Transactions'}
                                styles={{ px: '2', py: '1', rounded: 'full', bg: 'teal.100' }}>All Transactions
                            </Highlight>page.
                        </ListItem>

                        <ListItem fontSize={{ base: 'sm', md: 'sm' }}>
                            <ListIcon as={CheckCircleIcon} color='teal.300' />
                            Just click
                            <Highlight
                                query={'All Transactions'}
                                styles={{ px: '2', py: '1', rounded: 'full', bg: 'teal.100' }}>All Transactions
                            </Highlight>button or navigate form navbar link.
                        </ListItem>
                    </List>
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}


export default InformativeModel;