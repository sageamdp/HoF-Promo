import { Card, Flex, Text } from "@mantine/core";
import StrainTypeTag from "./StrainTypeTag";

export default function StrainTag({ abbr, name }: { abbr: string; name: string }) {
    return <Card radius='sm' withBorder bg={'rgba(255,255,255, 0.1)'} p='4' m='0' py='5'>
        <Flex direction='row' align={'center'} gap='0'>
            {StrainTypeTag({ type: abbr, color: abbr === "IND" ? 'brandBlueMarguerite' : abbr === "SAT" ? 'brandSilverTree' : 'brandCerulean' })}
            <Text ta='center' ml='5' fz='sm' style={{ textTransform: 'uppercase' }}>
                {name}
            </Text>
        </Flex>
    </Card>;
}