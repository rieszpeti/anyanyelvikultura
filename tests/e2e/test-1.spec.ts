import { test, expect } from '@playwright/test'

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/admin/login')
  await page.getByRole('textbox', { name: 'Email *' }).click()
  await page.getByRole('textbox', { name: 'Email *' }).fill('somemail@asd123.asd')
  await page.getByRole('textbox', { name: 'Email *' }).press('Tab')
  await page.getByRole('textbox', { name: 'Password' }).fill('admin')
  await page.getByRole('button', { name: 'Login' }).click()

  const timeout = 5 * 1000

  await expect(page.getByRole('link', { name: 'Show all Media' })).toBeVisible({ timeout: timeout })
  await expect(page.getByRole('link', { name: 'Show all Posts' })).toBeVisible({ timeout: timeout })
  await expect(page.getByRole('link', { name: 'Show all Carousel_images' })).toBeVisible({
    timeout: timeout,
  })
  await expect(page.getByRole('link', { name: 'Show all Pages' })).toBeVisible({ timeout: timeout })
  await expect(page.getByRole('link', { name: 'Show all Users' })).toBeVisible({ timeout: timeout })

  await page.getByRole('button', { name: 'Open Menu' }).click()
  await page.getByRole('link', { name: 'Log out' }).click()
})
