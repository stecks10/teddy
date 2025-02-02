import { test, expect } from "@playwright/test";

const generateRandomName = () => `Cliente ${Math.floor(Math.random() * 10000)}`;

const generateRandomValue = () => Math.floor(Math.random() * 1000000) + 1000;

test.describe("Gestão de Clientes", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/home");
  });

  test("Deve permitir criar um novo cliente com dados aleatórios", async ({
    page,
  }) => {
    const randomName = generateRandomName();
    const randomSalary = generateRandomValue();
    const randomCompanyValue = generateRandomValue();

    await page.getByRole("button", { name: "Criar Cliente" }).click();

    await page.fill('input[placeholder="Digite o nome"]', randomName);
    await page.fill(
      'input[placeholder="Digite o salário"]',
      randomSalary.toString()
    );
    await page.fill(
      'input[placeholder="Digite o valor da empresa"]',
      randomCompanyValue.toString()
    );

    await page.getByRole("button", { name: "Criar Cliente" }).click();

    await page.waitForSelector(`.cliente-card:has-text("${randomName}")`, {
      state: "visible",
    });

    await expect(
      page.locator(`.cliente-card:has-text("${randomName}")`)
    ).toBeVisible();

    const formattedSalary = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(randomSalary);

    const formattedCompanyValue = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(randomCompanyValue);

    await expect(
      page.locator(`.cliente-card:has-text("${formattedSalary}")`)
    ).toBeVisible();
    await expect(
      page.locator(`.cliente-card:has-text("${formattedCompanyValue}")`)
    ).toBeVisible();
  });
});
