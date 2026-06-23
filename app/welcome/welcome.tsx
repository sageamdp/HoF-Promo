import { Text } from "@mantine/core";
import { Button, Flex, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { Link } from "react-router";
  

export function Welcome() {

  const [resolution, setResolution] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setResolution({ width: window.innerWidth, height: window.innerHeight });
  }, []);

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
      <Text c="white">
        <Text>Your display resolution is currently {resolution.width}x{resolution.height}</Text>
      </Text>
      
    </Flex>
  );






}

