import { Card, Stack, Title, Text, Flex, Divider, Group } from "@mantine/core";
import StrainTypeTag from "./StrainTypeTag";
import type { PriceCategoryProps } from "types/types";

export default function PriceCategory({ name, color, priceOZ, priceHALF, priceWTR, price8TH, strains }: PriceCategoryProps & { color: string }) {
    return <Card component='nav' radius='sm' withBorder w='100%' bg={'rgba(255,255,255, 0.1)'}>
        <Stack gap='md'>
            <Title order={2} c={color} px={10} ta='center' style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>{name}</Title>
            <Flex w='100%' px={10} mb='0' justify='space-between' >
                <Flex direction='column'>
                    <Text ta='center' fz='md'>
                        OZ
                    </Text>
                    <Text ta='center' fz='xl'>
                        ${priceOZ}
                    </Text>
                </Flex>
                <Flex direction='column'>
                    <Text ta='center' fz='md'>
                        HALF
                    </Text>
                    <Text ta='center' fz='xl'>
                        ${priceHALF}
                    </Text>
                </Flex>
                <Flex direction='column'>
                    <Text ta='center' fz='md'>
                        QTR
                    </Text>
                    <Text ta='center' fz='xl'>
                        ${priceWTR}
                    </Text>
                </Flex>
                <Flex direction='column'>
                    <Text ta='center' fz='md'>
                        8TH
                    </Text>
                    <Text ta='center' fz='xl'>
                        ${price8TH}
                    </Text>
                </Flex>
            </Flex>
            <Divider w='100%' my='0' py='0' style={{
                background: `linear-gradient(90deg, rgba(255,255,255,0), #aaa, rgba(255,255,255,0))`
            }} />
            {strains.map(({ name, type, potency }) => (
                <Flex pb='sm' key={name} direction='row' w='100%' align='center' justify='space-between' style={{
                    borderBottom: name !== strains[strains.length - 1].name ? '1px solid rgba(255,255,255,0.1)' : 'none'
                }}>
                    <Group>
                        <Text>{name}</Text>
                        <StrainTypeTag type={type} color={type === "IND" ? 'brandBlueMarguerite' : type === "SAT" ? 'brandSilverTree' : 'brandCerulean'} />
                    </Group>
                    <Text>{potency}</Text>
                </Flex>
            ))}
        </Stack>
    </Card>;
}