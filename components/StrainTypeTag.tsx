import { Box, Card, Text } from "@mantine/core";

export default function StrainTypeTag({ type }: { type: string }) {
    const color = type === "IND" ? 'brandBlueMarguerite' : type === "SAT" ? 'brandSilverTree' : 'brandCerulean';
    return <Box>
        <Card radius='sm' withBorder bg={color} p='4' m='0' py='0'>
            <Text ta='center' c='white' opacity={0.75} fz='sm'>
                {type}
            </Text>
        </Card>
    </Box>;
}