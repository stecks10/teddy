import { test, expect } from "@playwright/test";

test("Deve permitir login e redirecionar para a página inicial", async ({
  page,
}) => {
  await page.goto("http://localhost:50789");

  await expect(page.locator("text=Olá, seja bem-vindo!")).toBeVisible();

  await page.fill('input[type="text"]', "UsuárioTeste");

  await page.click('button:has-text("Entrar")');

  await expect(page).toHaveURL("http://localhost:50789/home");

  const storedUsername = await page.evaluate(() =>
    localStorage.getItem("username")
  );
  expect(storedUsername).toBe("UsuárioTeste");
});
