import { Box, Flex, Text } from "@mantine/core";

export default function Footer() {
    return <Box>
        <Flex justify='center' style={{
            background: '#444',
            borderTop: '4px solid #aaa',

        }}
            gap='md'
            py='4px'
            mt='lg'>
            <Text style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Prices do not include tax
            </Text>
            <Text c='brandPersimmon'>•</Text>
            <Text style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Menu subject to change
            </Text>
            <Text c='brandPersimmon'>•</Text>
            <Text style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                House of Fire Dispenary
            </Text>
        </Flex>
    </Box>;
}