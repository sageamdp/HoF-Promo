import { Box, Flex } from "@mantine/core";
import SectionHeader from "components/SectionHeader";
import PriceCategory from "components/PriceCategory";
import SaleCard from "components/SaleCard";
import Footer from "components/Footer";
import type { Strain, SaleCardProps } from "types/types";


const strainsPremium = [
    { name: "Krunch Berries", type: "HYB", potency: '29.19%' } as Strain,
    { name: "Lemon Dropz", type: "SAT", potency: '28.19%' } as Strain,
    { name: "Candy Gas", type: "HYB", potency: '27.73%' } as Strain,
    { name: "Nerd Runtz", type: "HYB", potency: '27.67%' } as Strain,
];
const strainsReserve = [
    { name: "Black Garlic Gelato x GMO", type: "IND", potency: '27.50%' } as Strain,
    { name: "G-41", type: "HYB", potency: '24.94%' } as Strain,
    { name: "Lilac Diesel", type: "HYB", potency: '24.04%' } as Strain,
];
const strainsValue = [
    { name: "Runtz", type: "IND", potency: '29.19%' } as Strain,
    { name: "BTY OG", type: "HYB", potency: '25.00%' } as Strain,
    { name: "BTG Diesel", type: "SAT", potency: '25.00%' } as Strain,
]; 

const priceCategories = [
    { name: "Premium", color: 'brandPizzazz', priceOZ: 115, priceHALF: 79, priceWTR: 48, price8TH: 38, strains: strainsPremium },
    { name: "Reserve", color: 'brandPersimmon', priceOZ: 105, priceHALF: 72, priceWTR: 38, price8TH: 28, strains: strainsReserve },
    { name: "Value", color: 'brandStarship', priceOZ: 92, priceHALF: 55, priceWTR: 30, price8TH: 23, strains: strainsValue },
];
const vapes = [
    { name: "MUHA MEDS", dosage: "2g Disposable", price: "$35", saleText: "2 For $55" } as SaleCardProps,
    { name: "MADLABS", dosage: "2g Disposable", price: "$40", saleText: "2 For $55" } as SaleCardProps,
    { name: "GHOST", dosage: "2g Disposable", price: "$30", saleText: "2 For $50" } as SaleCardProps,
    { name: "STIIZY", dosage: "Live Resin AlO 1g", price: "$35"} as SaleCardProps,
    { name: "ROVE", dosage: "Live Resin 1g Cart", price: "$60"} as SaleCardProps,
    { name: "ROVE", dosage: "1g Disposable", price: "$55" } as SaleCardProps,
    { name: "QB LABS", dosage: "2g Disposable", price: "$33" } as SaleCardProps,
    { name: "CB", dosage: "1g Disposable", price: "$40" } as SaleCardProps,
]


export default function ScreenOne() {
    return (
        <Flex component='main' align='center' justify='center' pb='sm' w='100%'>


            <Flex direction='column' w='100%' style={{ zIndex: 10 }} >
                <Box mt={'md'} style={{ zIndex: 10, height: 6, background: `linear-gradient(90deg, rgba(255, 129, 110, 0), #ff6f46, rgba(255, 129, 110, 0))`, boxShadow: `10px 5px 10px #000000` }}></Box>
                <Box className="curved-shadow-box"></Box>
                {SectionHeader({ name: "Flower" })}
                <Flex mt={'md'} w='100%' gap='md' px='md' direction='row' >
                    {priceCategories.map(({ name, color, priceOZ, priceHALF, priceWTR, price8TH, strains }) => (
                        <PriceCategory key={name} name={name} color={color} priceOZ={priceOZ} priceHALF={priceHALF} priceWTR={priceWTR} price8TH={price8TH} strains={strains} />
                    ))}
                </Flex>
                {SectionHeader({ name: "Vapes" })}
                <Flex w='100%' gap='md' px='md' mt='md' direction='row' >
                    {vapes.map(({ name, dosage, price, saleText }) => (
                        <SaleCard key={name} name={name} dosage={dosage} price={price} saleText={saleText} />
                    ))}
                </Flex>
                {Footer()}

            </Flex>
        </Flex>
    );
}