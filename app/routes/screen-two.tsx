import { Box, Flex } from "@mantine/core";
import SectionHeader from "components/SectionHeader";
import PriceCategory from "components/PriceCategory";
import SaleCard from "components/SaleCard";
import Footer from "components/Footer";
import type { Strain, SaleCardProps, SaleAltCardProps } from "types/types";
import HouseOfFireLogo from "../../assets/HOF_logo-removebg-preview.png";
import HouseOfFireLogoDark from "../../assets/HOF_logo-removebg-preview-dark.png";
import BOUTIQLogo from "../../assets/BOUTIQ_LogoWhite.png"; 
import Caminologo from "../../assets/camino_logo.webp"; 
import Stiizylogo from "../../assets/stiizy_logo.png"; 
import SaleAltCard from "components/SaleAltCard";
import { db } from "../../db/index.js";
import { products } from "../../db/schema.js";
import { useLoaderData } from "react-router";

const imageMap: Record<string, string> = {
  camino: Caminologo,
  stiizy: Stiizylogo,
  boutiq: BOUTIQLogo,
  hof: HouseOfFireLogo,
  hof_dark: HouseOfFireLogoDark,
};

export async function loader() {
  try {
    const dbProducts = await db.select().from(products);
    return { dbProducts };
  } catch (err) {
    console.error("Database connection failed or table does not exist", err);
    return { dbProducts: [] };
  }
}

const edibles = [
    { name: "CAMINO GUMMIES", dosage: "Assorted Flavors", price: "$35", imageUrl: Caminologo } as SaleCardProps,
    { name: "CAMINO SOURS", dosage: "Assorted Flavors", price: "$35", imageUrl: Caminologo } as SaleCardProps,
    { name: "STIIZY GUMMIES", dosage: "Assorted Flavors", price: "$25",  imageUrl: Stiizylogo } as SaleCardProps,
    { name: "FADED FRUITS", dosage: "Assorted Flavors", price: "$30",  imageUrl: HouseOfFireLogo } as SaleCardProps
];

const concentrates = [
    {
        name: "LEMON CHERRY DIAMONDS", strainType: "HYB", potency: "82.96%", imageUrl: HouseOfFireLogo, prices: { priceOZ: 105, price1g: 10 }
    } as SaleAltCardProps,
    { name: "WHITE TRUFFLE BADDER", strainType: "IND", potency: "68.69%", prices: { priceOZ: 105, price1g: 10, } } as SaleAltCardProps,
];

const drinks = [
    {
        name: "LOUPER", dosage: "Cola • Diet Cola • Orange • Grape • Pineapple \n 50mg each", price: "$10"
    } as SaleCardProps,
    { name: "ORACLE", dosage: "Raspherry Spritz • 50mg", price: "$10" } as SaleCardProps,
    { name: "CHRONIC HARVEST", dosage: "Tea / Lemonade • 150mg", price: "$20" } as SaleCardProps,
];

const preRolls = [
    { name: "STIIZY 40'S", dosage: "5g x 5 Pack - Infused", price: "$32", imageUrl: Stiizylogo } as SaleCardProps,
    { name: "STIIZY 40'S", dosage: "1g Pre-Roll - Infused", price: "$17", imageUrl: Stiizylogo } as SaleCardProps,
    { name: "BOUTIQ SNACK PACK", dosage: "Infused Pre-Roll Pack", price: "$35", imageUrl: BOUTIQLogo } as SaleCardProps,
    { name: "HOUSE PRE ROLL", price: "$5", saleText: "5 for $20", imageUrl: HouseOfFireLogo } as SaleCardProps,
    { name: "BABY JEETER", dosage: ".5g x 5 Pack", price: "$45" } as SaleCardProps
];

export default function ScreenTwo() {
    const { dbProducts } = useLoaderData<typeof loader>();

    // Process Edibles
    const dbEdibles = dbProducts.filter((p) => p.category === "edible");
    const finalEdibles = dbEdibles.length > 0
      ? dbEdibles.map((e) => ({
          name: e.name,
          dosage: e.dosage || undefined,
          price: e.price || "",
          saleText: e.saleText || undefined,
          imageUrl: e.imageUrl ? imageMap[e.imageUrl] : undefined,
        }))
      : edibles;

    // Process Concentrates
    const dbConcentrates = dbProducts.filter((p) => p.category === "concentrate");
    const finalConcentrates = dbConcentrates.length > 0
      ? dbConcentrates.map((c) => ({
          name: c.name,
          strainType: c.type || "",
          potency: c.potency || "",
          imageUrl: c.imageUrl ? imageMap[c.imageUrl] : undefined,
          prices: {
            priceOZ: c.priceOZ ?? undefined,
            price1g: c.price1g ?? undefined,
          },
          saleText: c.saleText || undefined,
        }))
      : concentrates;

    // Process Drinks
    const dbDrinks = dbProducts.filter((p) => p.category === "drink");
    const finalDrinks = dbDrinks.length > 0
      ? dbDrinks.map((d) => ({
          name: d.name,
          dosage: d.dosage || undefined,
          price: d.price || "",
          saleText: d.saleText || undefined,
          imageUrl: d.imageUrl ? imageMap[d.imageUrl] : undefined,
        }))
      : drinks;

    // Process Pre-Rolls
    const dbPreRolls = dbProducts.filter((p) => p.category === "pre-roll");
    const finalPreRolls = dbPreRolls.length > 0
      ? dbPreRolls.map((pr) => ({
          name: pr.name,
          dosage: pr.dosage || undefined,
          price: pr.price || "",
          saleText: pr.saleText || undefined,
          imageUrl: pr.imageUrl ? imageMap[pr.imageUrl] : undefined,
        }))
      : preRolls;

    return (
        <Flex component='main' align='center' justify='center' pb='sm' w='100%'>
          <Flex direction='column'  w='100%' style={{ zIndex: 10 }} >
            <Box mt={'md'} style={{ zIndex: 10, height: 6, background: `linear-gradient(90deg, rgba(255, 129, 110, 0), #ff6f46, rgba(255, 129, 110, 0))`, boxShadow: `10px 5px 10px #000000`  }}></Box>
            <Box className="curved-shadow-box"></Box>
            {SectionHeader({ name: "Edibles & Concentrates" })}
                <Flex mt={'md'} w='100%' gap='md' px='md' direction='row' align='flex-start' >
                    {finalEdibles.map(({ name, dosage, price, saleText, imageUrl }) => (
                        <SaleCard key={name} name={name} dosage={dosage} price={price} saleText={saleText} imageUrl={imageUrl} />
                    ))}
                    {finalConcentrates.map(({ name, strainType, potency, prices, imageUrl }) => (
                        <SaleAltCard
                            key={name}
                            name={name}
                            strainType={strainType}
                            potency={potency}
                            prices={prices}
                            imageUrl={imageUrl}   
                            titleColor='white'
                        />
                    ))}
            </Flex> 
            {SectionHeader({ name: "Drinks" })}
            <Flex w='100%' gap='md' px='md' mt='md' direction='row' >
                {finalDrinks.map(({ name, dosage, price, saleText, imageUrl }) => (
                    <SaleCard short={true} key={name} name={name} dosage={dosage} price={price} saleText={saleText} imageUrl={imageUrl} />
                ))}
            </Flex>

            {SectionHeader({ name: "Pre-Rolls" })}

            <Flex w='100%' gap='md' px='md' mt='md' direction='row' >
                {finalPreRolls.map(({ name, dosage, price, saleText, imageUrl }) => (
                    <SaleCard short={true} key={name} name={name} dosage={dosage} price={price} saleText={saleText} imageUrl={imageUrl} titleColor='white' />
                ))}
            </Flex>
            {Footer()}
          </Flex>
        </Flex>
    );
}
