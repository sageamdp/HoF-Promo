
export type Strain = {
    name: string;
    type: string;
    potency: string;
};

export type PriceCategoryProps = {
    name: string;
    priceOZ: number;
    priceHALF: number;
    priceWTR: number;
    price8TH: number;
    strains: Strain[];
};

export type SaleCardProps = {
    name: string;
    dosage?: string;
    price: string;
    saleText?: string;
    imageUrl?: string;
    short?: boolean;
    titleColor?: string;
};

export type SectionHeaderProps = {
    name: string;
};

export type HeaderProps = {
    title: string;
};