import { test, expect } from "@playwright/test";

const generateRandomName = () => `Cliente ${Math.floor(Math.random() * 10000)}`;
const generateRandomValue = () => Math.floor(Math.random() * 1000000) + 1000;

test.describe("Gestão de Clientes - Editar Cliente", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/home");
  });

  test("Deve permitir editar um cliente existente", async ({ page }) => {
    await page.waitForSelector(".cliente-card", { state: "visible" });

    const clienteCard = page.locator(".cliente-card").first();

    await clienteCard.scrollIntoViewIfNeeded();

    const editButton = clienteCard.locator("[data-testid='editar-cliente']");

    await editButton.waitFor({ state: "visible" });
    await editButton.click();

    await page.waitForSelector("form", { state: "visible" });

    const newName = generateRandomName();
    const newSalary = generateRandomValue();
    const newCompanyValue = generateRandomValue();

    await page.fill('input[placeholder="Digite o nome"]', newName);
    await page.fill(
      'input[placeholder="Digite o salário"]',
      newSalary.toString()
    );
    await page.fill(
      'input[placeholder="Digite o valor da empresa"]',
      newCompanyValue.toString()
    );

    await page.getByRole("button", { name: "Editar Cliente" }).click();

    await page.waitForSelector(`.cliente-card:has-text("${newName}")`, {
      state: "visible",
    });

    const formattedSalary = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(newSalary);

    const formattedCompanyValue = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(newCompanyValue);

    await expect(
      page.locator(`.cliente-card:has-text("${newName}")`)
    ).toBeVisible();
    await expect(
      page.locator(`.cliente-card:has-text("${formattedSalary}")`)
    ).toBeVisible();
    await expect(
      page.locator(`.cliente-card:has-text("${formattedCompanyValue}")`)
    ).toBeVisible();
  });
});
