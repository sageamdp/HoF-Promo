import { Box, Card, Text } from "@mantine/core";

export default function StrainTypeTag({ type, color }: { type: string, color: string }) {
    return <Box>
        <Card radius='sm' withBorder bg={color} p='4' m='0' py='0'>
            <Text ta='center' c='white' opacity={0.75} fz='sm'>
                {type}
            </Text>
        </Card>
    </Box>;
}