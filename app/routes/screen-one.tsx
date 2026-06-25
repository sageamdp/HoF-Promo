import { Box, Flex } from "@mantine/core";
import SectionHeader from "components/SectionHeader";
import PriceCategory from "components/PriceCategory";
import SaleCard from "components/SaleCard";
import Footer from "components/Footer";
import type { Strain, SaleCardProps } from "types/types";
import { db } from "../../db/index.js";
import { products } from "../../db/schema.js";
import { useLoaderData } from "react-router";

// Import logos for dynamic mapping
import HouseOfFireLogo from "../../assets/HOF_logo-removebg-preview.png";
import HouseOfFireLogoDark from "../../assets/HOF_logo-removebg-preview-dark.png";
import BOUTIQLogo from "../../assets/BOUTIQ_LogoWhite.png"; 
import Caminologo from "../../assets/camino_logo.webp"; 
import Stiizylogo from "../../assets/stiizy_logo.png";

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
];

export default function ScreenOne() {
    const { dbProducts } = useLoaderData<typeof loader>();

    // Process Flowers
    const dbFlowers = dbProducts.filter((p) => p.category === "flower");
    const premiumDb = dbFlowers.filter((p) => p.subCategory === "Premium");
    const reserveDb = dbFlowers.filter((p) => p.subCategory === "Reserve");
    const valueDb = dbFlowers.filter((p) => p.subCategory === "Value");

    const getCategoryDetails = (
      name: string,
      color: string,
      defaultOZ: number,
      defaultHALF: number,
      defaultWTR: number,
      default8TH: number,
      dbStrains: any[],
      fallbackStrains: any[]
    ) => {
      if (dbStrains.length > 0) {
        const first = dbStrains[0];
        return {
          name,
          color,
          priceOZ: first.priceOZ ?? defaultOZ,
          priceHALF: first.priceHALF ?? defaultHALF,
          priceWTR: first.priceWTR ?? defaultWTR,
          price8TH: first.price8TH ?? default8TH,
          strains: dbStrains.map((s) => ({
            name: s.name,
            type: s.type || "",
            potency: s.potency || "",
          })),
        };
      }
      return {
        name,
        color,
        priceOZ: defaultOZ,
        priceHALF: defaultHALF,
        priceWTR: defaultWTR,
        price8TH: default8TH,
        strains: fallbackStrains,
      };
    };

    const finalPriceCategories = [
      getCategoryDetails("Premium", "brandPizzazz", 115, 79, 48, 38, premiumDb, strainsPremium),
      getCategoryDetails("Reserve", "brandPersimmon", 105, 72, 38, 28, reserveDb, strainsReserve),
      getCategoryDetails("Value", "brandStarship", 92, 55, 30, 23, valueDb, strainsValue),
    ];

    // Process Vapes
    const dbVapes = dbProducts.filter((p) => p.category === "vape");
    const finalVapes = dbVapes.length > 0
      ? dbVapes.map((v) => ({
          name: v.name,
          dosage: v.dosage || undefined,
          price: v.price || "",
          saleText: v.saleText || undefined,
          imageUrl: v.imageUrl ? imageMap[v.imageUrl] : undefined,
        }))
      : vapes;

    return (
        <Flex component='main' align='center' justify='center' pb='sm' w='100%'>
            <Flex direction='column' w='100%' style={{ zIndex: 10 }} >
                <Box mt={'md'} style={{ zIndex: 10, height: 6, background: `linear-gradient(90deg, rgba(255, 129, 110, 0), #ff6f46, rgba(255, 129, 110, 0))`, boxShadow: `10px 5px 10px #000000` }}></Box>
                <Box className="curved-shadow-box"></Box>
                {SectionHeader({ name: "Flower" })}
                <Flex mt={'md'} w='100%' gap='md' px='md' direction='row' >
                    {finalPriceCategories.map(({ name, color, priceOZ, priceHALF, priceWTR, price8TH, strains }) => (
                        <PriceCategory key={name} name={name} color={color} priceOZ={priceOZ} priceHALF={priceHALF} priceWTR={priceWTR} price8TH={price8TH} strains={strains} />
                    ))}
                </Flex>
                {SectionHeader({ name: "Vapes" })}
                <Flex w='100%' gap='md' px='md' mt='md' direction='row' >
                    {finalVapes.map(({ name, dosage, price, saleText, imageUrl }) => (
                        <SaleCard key={name} name={name} dosage={dosage} price={price} saleText={saleText} imageUrl={imageUrl} />
                    ))}
                </Flex>
                {Footer()}
            </Flex>
        </Flex>
    );
}
