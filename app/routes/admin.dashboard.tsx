import { Form, useLoaderData, useSubmit, useActionData } from "react-router";
import { useState } from "react";
import {
  Container,
  Paper,
  TextInput,
  Select,
  NumberInput,
  Button,
  Table,
  Title,
  Text,
  Group,
  Stack,
  Card,
  Grid,
  Tabs,
  Badge,
  ActionIcon,
  Modal,
  Alert,
} from "@mantine/core";
import { db } from "../../db/index.js";
import { products } from "../../db/schema.js";
import { requireAdminSession, logout } from "../utils/auth.server.js";
import { eq } from "drizzle-orm";

export async function loader({ request }: { request: Request }) {
  const admin = await requireAdminSession(request);
  const productsList = await db.select().from(products);
  return { admin, productsList };
}

export async function action({ request }: { request: Request }) {
  await requireAdminSession(request);
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "logout") {
    return logout();
  }

  if (intent === "seed") {
    // Only seed if empty or explicitly forced (we'll just clear first to avoid duplicates or do conditional check)
    const existing = await db.select().from(products).limit(1);
    if (existing.length > 0) {
      return { success: false, message: "Database already has products. Cannot seed duplicates." };
    }

    // Seed data
    const seedData = [
      // Flower - Premium
      { category: "flower", subCategory: "Premium", name: "Krunch Berries", type: "HYB", potency: "29.19%", priceOZ: 115, priceHALF: 79, priceWTR: 48, price8TH: 38 },
      { category: "flower", subCategory: "Premium", name: "Lemon Dropz", type: "SAT", potency: "28.19%", priceOZ: 115, priceHALF: 79, priceWTR: 48, price8TH: 38 },
      { category: "flower", subCategory: "Premium", name: "Candy Gas", type: "HYB", potency: "27.73%", priceOZ: 115, priceHALF: 79, priceWTR: 48, price8TH: 38 },
      { category: "flower", subCategory: "Premium", name: "Nerd Runtz", type: "HYB", potency: "27.67%", priceOZ: 115, priceHALF: 79, priceWTR: 48, price8TH: 38 },
      
      // Flower - Reserve
      { category: "flower", subCategory: "Reserve", name: "Black Garlic Gelato x GMO", type: "IND", potency: "27.50%", priceOZ: 105, priceHALF: 72, priceWTR: 38, price8TH: 28 },
      { category: "flower", subCategory: "Reserve", name: "G-41", type: "HYB", potency: "24.94%", priceOZ: 105, priceHALF: 72, priceWTR: 38, price8TH: 28 },
      { category: "flower", subCategory: "Reserve", name: "Lilac Diesel", type: "HYB", potency: "24.04%", priceOZ: 105, priceHALF: 72, priceWTR: 38, price8TH: 28 },
      
      // Flower - Value
      { category: "flower", subCategory: "Value", name: "Runtz", type: "IND", potency: "29.19%", priceOZ: 92, priceHALF: 55, priceWTR: 30, price8TH: 23 },
      { category: "flower", subCategory: "Value", name: "BTY OG", type: "HYB", potency: "25.00%", priceOZ: 92, priceHALF: 55, priceWTR: 30, price8TH: 23 },
      { category: "flower", subCategory: "Value", name: "BTG Diesel", type: "SAT", potency: "25.00%", priceOZ: 92, priceHALF: 55, priceWTR: 30, price8TH: 23 },

      // Vapes
      { category: "vape", name: "MUHA MEDS", dosage: "2g Disposable", price: "$35", saleText: "2 For $55" },
      { category: "vape", name: "MADLABS", dosage: "2g Disposable", price: "$40", saleText: "2 For $55" },
      { category: "vape", name: "GHOST", dosage: "2g Disposable", price: "$30", saleText: "2 For $50" },
      { category: "vape", name: "STIIZY", dosage: "Live Resin AlO 1g", price: "$35", imageUrl: "stiizy" },
      { category: "vape", name: "ROVE", dosage: "Live Resin 1g Cart", price: "$60" },
      { category: "vape", name: "ROVE", dosage: "1g Disposable", price: "$55" },
      { category: "vape", name: "QB LABS", dosage: "2g Disposable", price: "$33" },
      { category: "vape", name: "CB", dosage: "1g Disposable", price: "$40" },

      // Edibles
      { category: "edible", name: "CAMINO GUMMIES", dosage: "Assorted Flavors", price: "$35", imageUrl: "camino" },
      { category: "edible", name: "CAMINO SOURS", dosage: "Assorted Flavors", price: "$35", imageUrl: "camino" },
      { category: "edible", name: "STIIZY GUMMIES", dosage: "Assorted Flavors", price: "$25", imageUrl: "stiizy" },
      { category: "edible", name: "FADED FRUITS", dosage: "Assorted Flavors", price: "$30", imageUrl: "hof" },

      // Concentrates
      { category: "concentrate", name: "LEMON CHERRY DIAMONDS", type: "HYB", potency: "82.96%", imageUrl: "hof", priceOZ: 105, price1g: 10 },
      { category: "concentrate", name: "WHITE TRUFFLE BADDER", type: "IND", potency: "68.69%", priceOZ: 105, price1g: 10 },

      // Drinks
      { category: "drink", name: "LOUPER", dosage: "Cola • Diet Cola • Orange • Grape • Pineapple \n 50mg each", price: "$10" },
      { category: "drink", name: "ORACLE", dosage: "Raspherry Spritz • 50mg", price: "$10" },
      { category: "drink", name: "CHRONIC HARVEST", dosage: "Tea / Lemonade • 150mg", price: "$20" },

      // Pre-Rolls
      { category: "pre-roll", name: "STIIZY 40'S", dosage: "5g x 5 Pack - Infused", price: "$32", imageUrl: "stiizy" },
      { category: "pre-roll", name: "STIIZY 40'S", dosage: "1g Pre-Roll - Infused", price: "$17", imageUrl: "stiizy" },
      { category: "pre-roll", name: "BOUTIQ SNACK PACK", dosage: "Infused Pre-Roll Pack", price: "$35", imageUrl: "boutiq" },
      { category: "pre-roll", name: "HOUSE PRE ROLL", price: "$5", saleText: "5 for $20", imageUrl: "hof" },
      { category: "pre-roll", name: "BABY JEETER", dosage: ".5g x 5 Pack", price: "$45" },
    ];

    await db.insert(products).values(seedData);
    return { success: true, message: "Successfully seeded dispensary database!" };
  }

  const id = formData.get("id");
  const name = (formData.get("name") as string || "").trim();
  const category = formData.get("category") as string;
  const subCategory = formData.get("subCategory") as string || null;
  const type = formData.get("type") as string || null;
  const potency = formData.get("potency") as string || null;
  const dosage = formData.get("dosage") as string || null;
  const price = formData.get("price") as string || null;
  const saleText = formData.get("saleText") as string || null;
  const imageUrl = formData.get("imageUrl") as string || null;

  const priceOZ = formData.get("priceOZ") ? parseInt(formData.get("priceOZ") as string, 10) : null;
  const priceHALF = formData.get("priceHALF") ? parseInt(formData.get("priceHALF") as string, 10) : null;
  const priceWTR = formData.get("priceWTR") ? parseInt(formData.get("priceWTR") as string, 10) : null;
  const price8TH = formData.get("price8TH") ? parseInt(formData.get("price8TH") as string, 10) : null;
  const price1g = formData.get("price1g") ? parseInt(formData.get("price1g") as string, 10) : null;

  if (intent === "delete") {
    if (!id) return { error: "ID is required to delete." };
    await db.delete(products).where(eq(products.id, parseInt(id as string, 10)));
    return { success: true, message: "Product deleted successfully." };
  }

  if (!name || !category) {
    return { error: "Name and category are required." };
  }

  const values = {
    name,
    category,
    subCategory,
    type,
    potency,
    dosage,
    price,
    saleText,
    imageUrl,
    priceOZ,
    priceHALF,
    priceWTR,
    price8TH,
    price1g,
  };

  if (intent === "create") {
    await db.insert(products).values(values);
    return { success: true, message: "Product created successfully." };
  }

  if (intent === "update") {
    if (!id) return { error: "ID is required to update." };
    await db.update(products).set(values).where(eq(products.id, parseInt(id as string, 10)));
    return { success: true, message: "Product updated successfully." };
  }

  return { error: "Invalid intent." };
}

export default function AdminDashboard() {
  const { admin, productsList } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const submit = useSubmit();

  const [opened, setOpened] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  // Form states
  const [category, setCategory] = useState<string>("flower");
  const [subCategory, setSubCategory] = useState<string>("Premium");
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [potency, setPotency] = useState<string>("");
  const [dosage, setDosage] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [saleText, setSaleText] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");

  const [priceOZ, setPriceOZ] = useState<number | "">("");
  const [priceHALF, setPriceHALF] = useState<number | "">("");
  const [priceWTR, setPriceWTR] = useState<number | "">("");
  const [price8TH, setPrice8TH] = useState<number | "">("");
  const [price1g, setPrice1g] = useState<number | "">("");

  const openCreateModal = () => {
    setEditingProduct(null);
    setCategory("flower");
    setSubCategory("Premium");
    setName("");
    setType("");
    setPotency("");
    setDosage("");
    setPrice("");
    setSaleText("");
    setImageUrl("");
    setPriceOZ("");
    setPriceHALF("");
    setPriceWTR("");
    setPrice8TH("");
    setPrice1g("");
    setOpened(true);
  };

  const openEditModal = (product: any) => {
    setEditingProduct(product);
    setCategory(product.category);
    setSubCategory(product.subCategory || "Premium");
    setName(product.name || "");
    setType(product.type || "");
    setPotency(product.potency || "");
    setDosage(product.dosage || "");
    setPrice(product.price || "");
    setSaleText(product.saleText || "");
    setImageUrl(product.imageUrl || "");
    setPriceOZ(product.priceOZ ?? "");
    setPriceHALF(product.priceHALF ?? "");
    setPriceWTR(product.priceWTR ?? "");
    setPrice8TH(product.price8TH ?? "");
    setPrice1g(product.price1g ?? "");
    setOpened(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      const formData = new FormData();
      formData.append("intent", "delete");
      formData.append("id", id.toString());
      submit(formData, { method: "post" });
    }
  };

  const handleSeed = () => {
    const formData = new FormData();
    formData.append("intent", "seed");
    submit(formData, { method: "post" });
  };

  const handleLogout = () => {
    const formData = new FormData();
    formData.append("intent", "logout");
    submit(formData, { method: "post" });
  };

  const getBadgeColor = (type: string | null) => {
    if (!type) return "gray";
    if (type === "HYB") return "green";
    if (type === "SAT") return "red";
    if (type === "IND") return "blue";
    return "gray";
  };

  const categories = [
    { value: "flower", label: "Flower" },
    { value: "vape", label: "Vapes" },
    { value: "edible", label: "Edibles" },
    { value: "concentrate", label: "Concentrates" },
    { value: "drink", label: "Drinks" },
    { value: "pre-roll", label: "Pre-Rolls" },
  ];

  return (
    <div style={{ backgroundColor: "#111", minHeight: "100vh", color: "#fff", paddingBottom: 40 }}>
      {/* Header */}
      <Paper radius={0} p="md" style={{ backgroundColor: "#1a1a1a", borderBottom: "1px solid #333" }}>
        <Container size="lg">
          <Group position="apart" align="center">
            <div>
              <Title order={3} style={{ color: "#ff6f46" }}>
                HOF Dispensary Dashboard
              </Title>
              <Text size="xs" color="dimmed">
                Logged in as {admin.username}
              </Text>
            </div>
            <Group>
              <Button size="xs" variant="outline" color="red" onClick={handleLogout}>
                Logout
              </Button>
            </Group>
          </Group>
        </Container>
      </Paper>

      <Container size="lg" mt="xl">
        {actionData?.message && (
          <Alert title="Success" color="green" mb="md" variant="filled">
            {actionData.message}
          </Alert>
        )}
        {actionData?.error && (
          <Alert title="Error" color="red" mb="md" variant="filled">
            {actionData.error}
          </Alert>
        )}

        <Group position="apart" mb="lg">
          <Title order={2}>Dispensary Products</Title>
          <Group>
            {productsList.length === 0 && (
              <Button color="blue" onClick={handleSeed}>
                Seed Default Dispensary Data
              </Button>
            )}
            <Button
              onClick={openCreateModal}
              style={{
                background: "linear-gradient(90deg, #ff6f46, #ff8e6e)",
                color: "#fff",
                border: "none",
              }}
            >
              Add Product
            </Button>
          </Group>
        </Group>

        <Tabs defaultValue="all" styles={{
          tab: {
            color: "#aaa",
            "&[data-active]": {
              color: "#ff6f46",
              borderColor: "#ff6f46"
            }
          }
        }}>
          <Tabs.List mb="md" style={{ borderColor: "#333" }}>
            <Tabs.Tab value="all">All ({productsList.length})</Tabs.Tab>
            <Tabs.Tab value="flower">Flower</Tabs.Tab>
            <Tabs.Tab value="vape">Vapes</Tabs.Tab>
            <Tabs.Tab value="edible">Edibles</Tabs.Tab>
            <Tabs.Tab value="concentrate">Concentrates</Tabs.Tab>
            <Tabs.Tab value="drink">Drinks</Tabs.Tab>
            <Tabs.Tab value="pre-roll">Pre-Rolls</Tabs.Tab>
          </Tabs.List>

          {["all", "flower", "vape", "edible", "concentrate", "drink", "pre-roll"].map((tabVal) => {
            const filteredProducts = tabVal === "all"
              ? productsList
              : productsList.filter((p) => p.category === tabVal);

            return (
              <Tabs.Panel key={tabVal} value={tabVal}>
                <Paper withBorder p="md" style={{ backgroundColor: "#1a1a1a", borderColor: "#333" }}>
                  {filteredProducts.length === 0 ? (
                    <Text align="center" color="dimmed" py="xl">
                      No products found.
                    </Text>
                  ) : (
                    <div style={{ overflowX: "auto" }}>
                      <Table highlightOnHover verticalSpacing="sm" style={{ color: "#fff" }}>
                        <thead>
                          <tr style={{ borderBottom: "1px solid #333" }}>
                            <th style={{ color: "#aaa" }}>Name</th>
                            <th style={{ color: "#aaa" }}>Category</th>
                            <th style={{ color: "#aaa" }}>Sub/Type</th>
                            <th style={{ color: "#aaa" }}>Potency/Dosage</th>
                            <th style={{ color: "#aaa" }}>Price / Details</th>
                            <th style={{ color: "#aaa" }} style={{ textAlign: "right" }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredProducts.map((product) => (
                            <tr key={product.id} style={{ borderBottom: "1px solid #222" }}>
                              <td>
                                <Text size="sm" weight={700}>
                                  {product.name}
                                </Text>
                              </td>
                              <td>
                                <Badge color="orange" variant="light">
                                  {product.category}
                                </Badge>
                              </td>
                              <td>
                                <Group spacing="xs">
                                  {product.subCategory && (
                                    <Badge size="xs" variant="outline" color="yellow">
                                      {product.subCategory}
                                    </Badge>
                                  )}
                                  {product.type && (
                                    <Badge size="xs" color={getBadgeColor(product.type)}>
                                      {product.type}
                                    </Badge>
                                  )}
                                </Group>
                              </td>
                              <td>
                                <Text size="xs">
                                  {product.potency && `Potency: ${product.potency}`}
                                  {product.potency && product.dosage && " | "}
                                  {product.dosage && `Dosage: ${product.dosage}`}
                                </Text>
                              </td>
                              <td>
                                {product.category === "flower" ? (
                                  <Text size="xs" color="dimmed">
                                    OZ: ${product.priceOZ} | 1/2: ${product.priceHALF} | 1/4: ${product.priceWTR} | 1/8: ${product.price8TH}
                                  </Text>
                                ) : product.category === "concentrate" ? (
                                  <Text size="xs" color="dimmed">
                                    OZ: ${product.priceOZ} | 1g: ${product.price1g}
                                  </Text>
                                ) : (
                                  <Text size="xs">
                                    {product.price} {product.saleText && `(${product.saleText})`}
                                  </Text>
                                )}
                              </td>
                              <td style={{ textAlign: "right" }}>
                                <Group spacing="xs" position="right">
                                  <Button size="xs" color="yellow" variant="light" onClick={() => openEditModal(product)}>
                                    Edit
                                  </Button>
                                  <Button size="xs" color="red" variant="light" onClick={() => handleDelete(product.id)}>
                                    Delete
                                  </Button>
                                </Group>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  )}
                </Paper>
              </Tabs.Panel>
            );
          })}
        </Tabs>
      </Container>

      {/* Add / Edit Modal */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={editingProduct ? "Edit Product" : "Add Product"}
        size="lg"
        styles={{
          header: { backgroundColor: "#1a1a1a", color: "#fff", borderBottom: "1px solid #333" },
          body: { backgroundColor: "#1a1a1a", color: "#fff", paddingTop: 20 },
        }}
      >
        <Form method="post" onSubmit={() => setOpened(false)}>
          <input type="hidden" name="intent" value={editingProduct ? "update" : "create"} />
          {editingProduct && <input type="hidden" name="id" value={editingProduct.id} />}

          <Stack spacing="md">
            <TextInput
              label="Product Name"
              placeholder="e.g., Krunch Berries"
              required
              name="name"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
              styles={{
                label: { color: "#fff" },
                input: { backgroundColor: "#252525", color: "#fff", borderColor: "#333" },
              }}
            />

            <Grid>
              <Grid.Col span={6}>
                <Select
                  label="Category"
                  placeholder="Select category"
                  required
                  name="category"
                  value={category}
                  onChange={(val) => setCategory(val || "flower")}
                  data={categories}
                  styles={{
                    label: { color: "#fff" },
                    input: { backgroundColor: "#252525", color: "#fff", borderColor: "#333" },
                    dropdown: { backgroundColor: "#252525", color: "#fff" },
                  }}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                {category === "flower" && (
                  <Select
                    label="Flower Sub-Category"
                    placeholder="e.g., Premium"
                    name="subCategory"
                    value={subCategory}
                    onChange={(val) => setSubCategory(val || "Premium")}
                    data={[
                      { value: "Premium", label: "Premium" },
                      { value: "Reserve", label: "Reserve" },
                      { value: "Value", label: "Value" },
                    ]}
                    styles={{
                      label: { color: "#fff" },
                      input: { backgroundColor: "#252525", color: "#fff", borderColor: "#333" },
                      dropdown: { backgroundColor: "#252525", color: "#fff" },
                    }}
                  />
                )}
              </Grid.Col>
            </Grid>

            <Grid>
              <Grid.Col span={6}>
                <Select
                  label="Strain Type"
                  placeholder="Select type"
                  name="type"
                  value={type}
                  onChange={(val) => setType(val || "")}
                  data={[
                    { value: "", label: "None / Not Applicable" },
                    { value: "HYB", label: "Hybrid (HYB)" },
                    { value: "SAT", label: "Sativa (SAT)" },
                    { value: "IND", label: "Indica (IND)" },
                  ]}
                  styles={{
                    label: { color: "#fff" },
                    input: { backgroundColor: "#252525", color: "#fff", borderColor: "#333" },
                    dropdown: { backgroundColor: "#252525", color: "#fff" },
                  }}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  label="Potency"
                  placeholder="e.g., 29.19%"
                  name="potency"
                  value={potency}
                  onChange={(e) => setPotency(e.currentTarget.value)}
                  styles={{
                    label: { color: "#fff" },
                    input: { backgroundColor: "#252525", color: "#fff", borderColor: "#333" },
                  }}
                />
              </Grid.Col>
            </Grid>

            {category !== "flower" && category !== "concentrate" && (
              <Grid>
                <Grid.Col span={6}>
                  <TextInput
                    label="Dosage / Size"
                    placeholder="e.g., 2g Disposable"
                    name="dosage"
                    value={dosage}
                    onChange={(e) => setDosage(e.currentTarget.value)}
                    styles={{
                      label: { color: "#fff" },
                      input: { backgroundColor: "#252525", color: "#fff", borderColor: "#333" },
                    }}
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <TextInput
                    label="Price String"
                    placeholder="e.g., $35"
                    name="price"
                    value={price}
                    onChange={(e) => setPrice(e.currentTarget.value)}
                    styles={{
                      label: { color: "#fff" },
                      input: { backgroundColor: "#252525", color: "#fff", borderColor: "#333" },
                    }}
                  />
                </Grid.Col>
              </Grid>
            )}

            {category === "flower" && (
              <Grid>
                <Grid.Col span={3}>
                  <NumberInput
                    label="Price OZ ($)"
                    name="priceOZ"
                    value={priceOZ}
                    onChange={(val) => setPriceOZ(val)}
                    styles={{
                      label: { color: "#fff" },
                      input: { backgroundColor: "#252525", color: "#fff", borderColor: "#333" },
                    }}
                  />
                </Grid.Col>
                <Grid.Col span={3}>
                  <NumberInput
                    label="Price 1/2 ($)"
                    name="priceHALF"
                    value={priceHALF}
                    onChange={(val) => setPriceHALF(val)}
                    styles={{
                      label: { color: "#fff" },
                      input: { backgroundColor: "#252525", color: "#fff", borderColor: "#333" },
                    }}
                  />
                </Grid.Col>
                <Grid.Col span={3}>
                  <NumberInput
                    label="Price 1/4 ($)"
                    name="priceWTR"
                    value={priceWTR}
                    onChange={(val) => setPriceWTR(val)}
                    styles={{
                      label: { color: "#fff" },
                      input: { backgroundColor: "#252525", color: "#fff", borderColor: "#333" },
                    }}
                  />
                </Grid.Col>
                <Grid.Col span={3}>
                  <NumberInput
                    label="Price 1/8 ($)"
                    name="price8TH"
                    value={price8TH}
                    onChange={(val) => setPrice8TH(val)}
                    styles={{
                      label: { color: "#fff" },
                      input: { backgroundColor: "#252525", color: "#fff", borderColor: "#333" },
                    }}
                  />
                </Grid.Col>
              </Grid>
            )}

            {category === "concentrate" && (
              <Grid>
                <Grid.Col span={6}>
                  <NumberInput
                    label="Price OZ ($)"
                    name="priceOZ"
                    value={priceOZ}
                    onChange={(val) => setPriceOZ(val)}
                    styles={{
                      label: { color: "#fff" },
                      input: { backgroundColor: "#252525", color: "#fff", borderColor: "#333" },
                    }}
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <NumberInput
                    label="Price 1g ($)"
                    name="price1g"
                    value={price1g}
                    onChange={(val) => setPrice1g(val)}
                    styles={{
                      label: { color: "#fff" },
                      input: { backgroundColor: "#252525", color: "#fff", borderColor: "#333" },
                    }}
                  />
                </Grid.Col>
              </Grid>
            )}

            <Grid>
              <Grid.Col span={6}>
                <TextInput
                  label="Sale Text / Promotion"
                  placeholder="e.g., 2 For $55"
                  name="saleText"
                  value={saleText}
                  onChange={(e) => setSaleText(e.currentTarget.value)}
                  styles={{
                    label: { color: "#fff" },
                    input: { backgroundColor: "#252525", color: "#fff", borderColor: "#333" },
                  }}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Select
                  label="Logo / Image Brand"
                  placeholder="Select brand logo"
                  name="imageUrl"
                  value={imageUrl}
                  onChange={(val) => setImageUrl(val || "")}
                  data={[
                    { value: "", label: "No Logo" },
                    { value: "camino", label: "Camino" },
                    { value: "stiizy", label: "Stiiizy" },
                    { value: "boutiq", label: "Boutiq" },
                    { value: "hof", label: "House of Fire" },
                  ]}
                  styles={{
                    label: { color: "#fff" },
                    input: { backgroundColor: "#252525", color: "#fff", borderColor: "#333" },
                    dropdown: { backgroundColor: "#252525", color: "#fff" },
                  }}
                />
              </Grid.Col>
            </Grid>

            <Button
              type="submit"
              mt="lg"
              style={{
                background: "linear-gradient(90deg, #ff6f46, #ff8e6e)",
                color: "#fff",
                border: "none",
              }}
            >
              {editingProduct ? "Save Changes" : "Create Product"}
            </Button>
          </Stack>
        </Form>
      </Modal>
    </div>
  );
}
