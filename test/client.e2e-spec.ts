import { test, expect } from "@playwright/test";

test.describe("Gestão de Clientes", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/home");
  });

  test("Deve permitir criar um novo cliente", async ({ page }) => {
    await page.getByRole("button", { name: "Criar Cliente" }).click();

    await page.fill('input[placeholder="Digite o nome"]', "Cliente Teste");
    await page.fill('input[placeholder="Digite o salário"]', "5000");
    await page.fill('input[placeholder="Digite o valor da empresa"]', "200000");

    await page.getByRole("button", { name: "Criar Cliente" }).click();

    await page.waitForSelector(".cliente-card:has-text('Cliente Teste')", {
      state: "visible",
    });

    await expect(
      page.locator(".cliente-card:has-text('Cliente Teste')")
    ).toBeVisible();
    await expect(
      page.locator(".cliente-card:has-text('R$ 5.000,00')")
    ).toBeVisible();
    await expect(
      page.locator(".cliente-card:has-text('R$ 200.000,00')")
    ).toBeVisible();
  });
});
