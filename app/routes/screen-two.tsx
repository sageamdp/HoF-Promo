import { Box, Flex } from "@mantine/core";
import SectionHeader from "components/SectionHeader";
import PriceCategory from "components/PriceCategory";
import SaleCard from "components/SaleCard";
import Footer from "components/Footer";
import type { Strain, SaleCardProps } from "types/types";
import HouseOfFireLogo from "../../assets/HOF_logo.png"; 

const edibles = [
    { name: "Gummies", dosage: "Assorted Flavors", price: "$35", imageUrl: HouseOfFireLogo } as SaleCardProps,
    { name: "Edible B", dosage: "Assorted Flavors", price: "$12", imageUrl: HouseOfFireLogo } as SaleCardProps,
    { name: "Edible C", dosage: "Assorted Flavors", price: "$15",  } as SaleCardProps,
    { name: "Edible D", dosage: "Assorted Flavors", price: "$20",  } as SaleCardProps
]

const drinks = [
    { name: "Drink A", dosage: "Assorted Flavors", price: "$5" } as SaleCardProps,
    { name: "Drink B", dosage: "Assorted Flavors", price: "$6"} as SaleCardProps,
    { name: "Drink C", dosage: "Assorted Flavors", price: "$7" } as SaleCardProps,
]

const preRolls = [
    { name: "Pre-Roll A", dosage: "Assorted Flavors", price: "$10" } as SaleCardProps,
    { name: "Pre-Roll B", dosage: "Assorted Flavors", price: "$12" } as SaleCardProps,
    { name: "Pre-Roll C", dosage: "Assorted Flavors", price: "$15" } as SaleCardProps,
    { name: "Pre-Roll D", price: "$18", saleText: "5 for $20" } as SaleCardProps,
    { name: "Pre-Roll E", dosage: "Assorted Flavors", price: "$20" } as SaleCardProps
] 

export default function ScreenOne() {
    return (
        <Flex component='main' align='center' justify='center' pb='sm' w='100%'>
    
    
          <Flex direction='column'  w='100%' style={{ zIndex: 10 }} >
            <Box mt={'md'} style={{ zIndex: 10, height: 6, background: `linear-gradient(90deg, rgba(255, 129, 110, 0), #ff6f46, rgba(255, 129, 110, 0))`, boxShadow: `10px 5px 10px #000000`  }}></Box>
            <Box className="curved-shadow-box"></Box>
            {SectionHeader({ name: "Edibles & Concentrates" })}
                <Flex mt={'md'} w='100%' gap='md' px='md' direction='row' >
                    {edibles.map(({ name, dosage, price, saleText, imageUrl }) => (
                        <SaleCard key={name} name={name} dosage={dosage} price={price} saleText={saleText} imageUrl={imageUrl} />
                    ))}
            </Flex> 
            {SectionHeader({ name: "Drinks" })}
            <Flex w='100%' gap='md' px='md' mt='md' direction='row' >
                {drinks.map(({ name, dosage, price, saleText, imageUrl }) => (
                    <SaleCard short={true} key={name} name={name} dosage={dosage} price={price} saleText={saleText} imageUrl={imageUrl} />
                ))}
            </Flex>

            {SectionHeader({ name: "Pre-Rolls" })}

            <Flex w='100%' gap='md' px='md' mt='md' direction='row' >
                {preRolls.map(({ name, dosage, price, saleText, imageUrl }) => (
                    <SaleCard short={true} key={name} name={name} dosage={dosage} price={price} saleText={saleText} imageUrl={imageUrl} titleColor='white' />
                ))}
            </Flex>
            {Footer()}
             
          </Flex>
        </Flex>
    );
}