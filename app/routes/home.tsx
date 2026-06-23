import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import Header from "../../components/Header";
import type { Box } from "@mantine/core";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "House of Fire TV Display" },
    { name: "description", content: "House of Fire TV Display" },
  ];
}

export default function Home() {
  return <Welcome />;
}
