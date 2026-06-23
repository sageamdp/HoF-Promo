
import { Button, Flex, Title } from "@mantine/core";
import { Link } from "react-router";
  

export function Welcome() {
  return (
    <Flex component='main' align='center' justify='center' pb='sm' w='100%' direction='column' gap='md'>
      <Title order={1}>Welcome</Title>
      <Button
        component={Link}
        to="/screen-one"
      >
        Go to Screen One
      </Button>
      <Button
        component={Link}
        to="/screen-two"
      >
        Go to Screen Two
      </Button>
      
    </Flex>
  );






}

