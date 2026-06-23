import { Card, Stack, Title, Text, Image, Flex, Group } from "@mantine/core";
import { motion } from "framer-motion";
import type { SaleAltCardProps } from "types/types";
import StrainTypeTag from "./StrainTypeTag";
export default function SaleAltCard({ name, strainType, potency, prices, saleText, imageUrl, short = false, titleColor = 'brandPersimmon' }: SaleAltCardProps) {



    return <Card component='nav' radius='sm' withBorder w='100%' style={{ background: 'rgba(255,255,255,0.1)' }}>

        <motion.div
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1,
                opacity: 0.2,
                width: '100%',
            }}
            transition={{
                repeat: Infinity,
                duration: 8, // Adjust this value to speed up or slow down the spin
                ease: "linear",
            }}
        >

            {imageUrl && (
                <Image
                    src={imageUrl}
                    alt="House of Fire"
                    width={'100%'}

                    className="rotating-image"
                />
            )}
        </motion.div>

        <Flex direction={'column'} gap='0' justify='center' style={{ zIndex: 10, height: short ? '200px' : '400px'  }} align='center'>
            <Text ta='center' c='brandPersimmon' style={{
                textTransform: 'uppercase',
                letterSpacing: '0.0905em'
            }} fz='sm'>Concentrate</Text>
            <Title ta='center' c={titleColor} style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }} fz='md'>{name}</Title>
            <Flex justify='center' align='center' gap='sm'>
                <StrainTypeTag type={strainType} />
                <Text ta='center'>
                    {potency}
                </Text>
            </Flex>
            <Flex justify='center' gap='lg'>
                <Stack gap='0'>
                    <Text ta='center'>1G</Text>
                    <Text ta='center'>{prices?.price1g ? `$${prices.price1g}` : ''}</Text>
                </Stack>
                <Stack gap='0'>
                    <Text ta='center'>OZ</Text>
                    <Text ta='center'>{prices?.priceOZ ? `$${prices.priceOZ}` : ''}</Text>
                </Stack>
            </Flex>
            {saleText && (
                <Text mt='sm' ta='center' bg='brandWattle' style={{ textTransform: 'uppercase', letterSpacing: '0.05em', color: 'black', borderRadius: '4px', boxShadow: `0 0 15px #DEDE58` }}>
                    {saleText}
                </Text>
            )}
        </Flex>
    </Card>;
}