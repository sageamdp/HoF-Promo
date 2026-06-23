import { Card, Stack, Title, Text, Image } from "@mantine/core";
import { motion } from "framer-motion";
import type { SaleCardProps } from "types/types";
export default function SaleCard({ name, dosage, price, saleText, imageUrl, short = false, titleColor = 'brandPersimmon' }: SaleCardProps) {



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

      <Stack gap='0' mih={short ? '200px' : '400px'} justify='center' style={{ zIndex: 10}}>
        <Title ta='center' c={titleColor} style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>{name}</Title>
        <Text ta='center'>
          {dosage}
        </Text>
        <Text ta='center' fz='lg'>
          {price}
        </Text>
        <Text mt='sm' ta='center' bg='brandWattle' style={{ textTransform: 'uppercase', letterSpacing: '0.05em', color: 'black', borderRadius: '4px', boxShadow: `0 0 15px #DEDE58` }}>
          {saleText}
        </Text>
      </Stack>
    </Card>;
  }