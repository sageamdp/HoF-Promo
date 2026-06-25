import { useState } from "react";
import { Form, useActionData, useLoaderData, redirect } from "react-router";
import { Container, Paper, TextInput, PasswordInput, Button, Title, Text, Center, Alert } from "@mantine/core";
import { db } from "../../db/index.js";
import { users } from "../../db/schema.js";
import { hashPassword, verifyPassword, createAdminSession, getAdminSession } from "../utils/auth.server.js";
import { eq } from "drizzle-orm";

export async function loader({ request }: { request: Request }) {
  // If already logged in, redirect to dashboard
  const admin = await getAdminSession(request);
  if (admin) {
    return redirect("/admin/dashboard");
  }

  const existingUsers = await db.select().from(users).limit(1);
  const hasAdmin = existingUsers.length > 0;

  return { hasAdmin };
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const actionType = formData.get("actionType");
  const username = (formData.get("username") as string || "").trim();
  const password = formData.get("password") as string || "";

  if (!username || !password) {
    return { error: "Username and password are required." };
  }

  const existingUsers = await db.select().from(users).limit(1);
  const hasAdmin = existingUsers.length > 0;

  if (actionType === "register") {
    if (hasAdmin) {
      return { error: "An admin account already exists. Please log in." };
    }

    if (password.length < 6) {
      return { error: "Password must be at least 6 characters long." };
    }

    const hashedPassword = hashPassword(password);
    await db.insert(users).values({
      username,
      passwordHash: hashedPassword,
    });

    return createAdminSession(username, "/admin/dashboard");
  } else {
    // login action
    const [user] = await db.select().from(users).where(eq(users.username, username)).limit(1);
    if (!user) {
      return { error: "Invalid username or password." };
    }

    const isValid = verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return { error: "Invalid username or password." };
    }

    return createAdminSession(username, "/admin/dashboard");
  }
}

export default function AdminLogin() {
  const { hasAdmin } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  return (
    <Center style={{ width: "100%", minHeight: "100vh", backgroundColor: "#111" }}>
      <Container size={420} my={40}>
        <Title
          align="center"
          style={{
            fontFamily: "Greycliff CF, sans-serif",
            fontWeight: 900,
            color: "#fff",
          }}
        >
          {hasAdmin ? "Dispensary Admin Portal" : "Dispensary Admin Setup"}
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          {hasAdmin
            ? "Log in to manage dispensary screens and product menus"
            : "No admin user found. Create your initial admin account to get started"}
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md" style={{ backgroundColor: "#1a1a1a", borderColor: "#333" }}>
          {actionData?.error && (
            <Alert title="Authentication Error" color="red" mb="md" variant="filled">
              {actionData.error}
            </Alert>
          )}

          <Form method="post">
            <input type="hidden" name="actionType" value={hasAdmin ? "login" : "register"} />
            <TextInput
              label="Username"
              placeholder="admin"
              name="username"
              required
              styles={{
                label: { color: "#fff" },
                input: { backgroundColor: "#252525", color: "#fff", borderColor: "#333" },
              }}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              name="password"
              required
              mt="md"
              styles={{
                label: { color: "#fff" },
                input: { backgroundColor: "#252525", color: "#fff", borderColor: "#333" },
              }}
            />
            <Button
              type="submit"
              fullWidth
              mt="xl"
              style={{
                background: "linear-gradient(90deg, #ff6f46, #ff8e6e)",
                color: "#fff",
                border: "none",
              }}
            >
              {hasAdmin ? "Sign in" : "Create Account & Log in"}
            </Button>
          </Form>
        </Paper>
      </Container>
    </Center>
  );
}
