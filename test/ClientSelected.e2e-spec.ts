import { test, expect } from "@playwright/test";

test.describe("Gestão de Clientes - Teste dos Botões", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/clientes-selecionados");

    await page.waitForTimeout(1000);
  });

  test("Deve verificar se pelo menos um botão de remover cliente está visível", async ({
    page,
  }) => {
    const removeButtons = page.locator("[data-testid='remove-cliente']");
    await expect(removeButtons.first()).toBeVisible();
  });

  test("Deve clicar no primeiro botão de remover um cliente", async ({
    page,
  }) => {
    const firstRemoveButton = page
      .locator("[data-testid='remove-cliente']")
      .first();
    await expect(firstRemoveButton).toBeVisible();
    await firstRemoveButton.click();
    await page.waitForTimeout(500);
  });

  test("Deve verificar se o botão 'Limpar clientes selecionados' está visível", async ({
    page,
  }) => {
    const clearFavoritesButton = page.getByRole("button", {
      name: "Limpar clientes selecionados",
    });
    await expect(clearFavoritesButton).toBeVisible();
  });

  test("Deve clicar no botão 'Limpar clientes selecionados'", async ({
    page,
  }) => {
    const clearFavoritesButton = page.getByRole("button", {
      name: "Limpar clientes selecionados",
    });
    await expect(clearFavoritesButton).toBeVisible();
    await clearFavoritesButton.click();
    await page.waitForTimeout(500);
  });
});
