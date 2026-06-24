
import { Flex, Group, Image, Text, Stack } from "@mantine/core";
import logoDark from "../assets/HOF_logo.png"
import StrainTag from "./StrainTag";
import { useState, useEffect } from "react";
import { format } from "date-fns/format";
import { useLocation } from "react-router";


export default function Header() {

    // Initialize state with the current time string
    const [time, setTime] = useState(new Date());

    useEffect(() => {
      // Set up a timer to update state every 1000ms (1 second)
      const timerId = setInterval(() => {
        setTime(new Date());
      }, 1000);

      // Clean up the interval when the component unmounts
      return () => clearInterval(timerId);
    }, []); // Empty dependency array ensures this runs once on mount







    
    const [pageTitle, setPageTitle] = useState('Home');

    const titleMap = [
        { path: '/', title: 'Home' },
        { path: '/screen-one', title: 'Flower & Vapes' },
        { path: '/screen-two', title: 'Edibles, Concentrates & Pre-rolls ' } 
    ]

    let curLoc = useLocation();
    useEffect(() => {
        const curTitle = titleMap.find(item => item.path === curLoc.pathname)
        if (curTitle && curTitle.title) {
            setPageTitle(curTitle.title)
            document.title = curTitle.title
        }
    }, [curLoc])

    return <Flex component='header' direction='row' align='center' justify='space-between' gap='lg' w='100%' px='md' style={{ position: 'relative', zIndex: 2 }}>
        <Group>
            <Image
                src={logoDark}
                alt="React Router"
                width={100}
                height={100} />
        </Group>
        <Group>
            <Text ta='center' c='white' style={{
                fontSize: '3rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
            }}
            >
                <span dangerouslySetInnerHTML={{ __html: pageTitle.replace(/\b\w/g, "<span class='--mantine-color-brandPersimmon'>$&</span>") }} />
            </Text>
        </Group>
        <Stack>
            <Text ta='center' c='white'>
                {format(time || new Date(), "eee • MMM d, yyyy • h:mm a").toUpperCase()}
            </Text>
            {pageTitle == 'Flower & Vapes' && <Flex direction='row' gap='md'>
                {StrainTag({ abbr: "IND", name: "Indica" })}
                {StrainTag({ abbr: "SAT", name: "Sativa" })}
                {StrainTag({ abbr: "HYB", name: "Hybrid" })}
            </Flex>}
        </Stack>
        
    </Flex>;
}
