import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(), // 'flower', 'vape', 'edible', 'concentrate', 'drink', 'pre-roll'
  subCategory: text("sub_category"), // 'Premium', 'Reserve', 'Value' (used for flower)
  name: text("name").notNull(),
  type: text("type"), // 'HYB', 'SAT', 'IND'
  potency: text("potency"),
  dosage: text("dosage"),
  price: text("price"),
  saleText: text("sale_text"),
  imageUrl: text("image_url"),
  priceOZ: integer("price_oz"),
  priceHALF: integer("price_half"),
  priceWTR: integer("price_wtr"),
  price8TH: integer("price_8th"),
  price1g: integer("price_1g"),
  createdAt: timestamp("created_at").defaultNow(),
});
