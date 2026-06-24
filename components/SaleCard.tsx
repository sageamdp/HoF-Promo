import { Card, Stack, Title, Text, Image, Box } from "@mantine/core";
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
          width: '100%',
        }}
        transition={{
          repeat: Infinity,
          duration: 8, // Adjust this value to speed up or slow down the spin
          ease: "linear",
        }}
      >
        {imageUrl && (
          <Box
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              mixBlendMode: 'overlay',
              width: '100%',
              opacity: 0.2
            }}
            className="rotating-image"
          ><Image
              src={imageUrl}
              alt="House of Fire"
              width={'100%'}
              style={{ mixBlendMode: 'screen' }}
            />
            </Box>
          
        )}
      </motion.div>

      <Stack gap='0' mih={short ? '200px' : '400px'} justify='center' style={{ zIndex: 10}}>
        <Title ta='center' c={titleColor} style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>{name}</Title>
        <Text ta='center'>
          {dosage ? <span dangerouslySetInnerHTML={{ __html: dosage.replace(/\n/g, '<br />') }} /> : null}
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