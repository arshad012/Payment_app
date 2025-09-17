import { Box, HStack, useRadioGroup, useRadio } from "@chakra-ui/react"

// 1. Create a component that consumes the `useRadio` hook
function RadioCard(props) {
    const { getInputProps, getRadioProps } = useRadio(props)

    const input = getInputProps()
    const checkbox = getRadioProps()

    return (
        <Box as='label'>
            <input {...input} />
            <Box
                {...checkbox}
                cursor='pointer'
                borderWidth='1px'
                borderRadius='md'
                boxShadow='md'
                _checked={{
                    bg: 'blue.500',
                    color: 'white',
                    borderColor: 'blue.500',
                }}
                _focus={{
                    boxShadow: 'outline',
                }}
                px={5}
                py={2}
            >
                {props.children}
            </Box>
        </Box>
    )
}

// Step 2: Use the `useRadioGroup` hook to control a group of custom radios.
function UserRoll({onChange}) {
    const options = ['Trustee', 'School']

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'framework',
        defaultValue: 'Trustee',
        onChange
    })

    const group = getRootProps()

    return (
        <HStack {...group}spacing={5} w='full'>
            {options.map((value) => {
                const radio = getRadioProps({ value })
                return (
                    <RadioCard key={value} {...radio}>
                        {value}
                    </RadioCard>
                )
            })}
        </HStack>
    )
}


export default UserRoll