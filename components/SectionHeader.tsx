import { Flex, Title, Divider } from "@mantine/core";
import type { SectionHeaderProps } from "types/types";

export default function SectionHeader({ name }: SectionHeaderProps) {
    return <Flex mt={'md'} direction='row' gap='md' align='center' px='md'>
      <Title order={1} style={{ textTransform: 'uppercase', letterSpacing: '2px' }} c='brandPersimmon' textWrap="nowrap">{name}</Title>
      <Divider  h='4px' />
    </Flex>;
}