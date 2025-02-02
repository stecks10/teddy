import { test, expect } from "@playwright/test";

test.describe("Gestão de Clientes - Excluir Cliente", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/home");
  });

  test("Deve permitir excluir um cliente existente", async ({ page }) => {
    await page.waitForSelector(".cliente-card", { state: "visible" });

    const clienteCard = page.locator(".cliente-card").first();

    const clienteNome = await clienteCard.locator("h3").innerText();

    const deleteButton = clienteCard.locator("[data-testid='delete-cliente']");

    await deleteButton.waitFor({ state: "visible" });
    await deleteButton.click();

    await page.waitForSelector("div:has-text('Excluir Cliente')", {
      state: "visible",
    });

    await page.getByRole("button", { name: "Excluir Cliente" }).click();

    await expect(
      page.locator(`.cliente-card:has-text("${clienteNome}")`)
    ).not.toBeVisible();
  });
});
