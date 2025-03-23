import { test, expect, Page } from '@playwright/test'
import { v4 as uuid } from 'uuid'

test.describe.serial('admin and user test', () => {
  let page: Page
  const timeout = 10 * 1000 //milliseconds -> 10 sec
  const userId = uuid()
  const email = `${userId}@${userId}.${userId}`
  const newPageId = uuid()

  test.setTimeout(5 * 60 * 1000) // 5 minutes

  test.beforeAll(async ({ browser }) => {
    if (!page) {
      page = await browser.newPage()
    }
  })
  test.afterAll(async () => {
    await page.close()
  })

  test('login and check visibility and logs out', async () => {
    await page.goto('http://localhost:3000/admin/login')
    await page.getByRole('textbox', { name: 'Email *' }).click()
    await page.getByRole('textbox', { name: 'Email *' }).fill('somemail@asd123.asd')
    await page.getByRole('textbox', { name: 'Email *' }).press('Tab')
    await page.getByRole('textbox', { name: 'Password' }).fill('admin')
    await page.getByRole('button', { name: 'Login' }).click()

    await expect(page.getByRole('link', { name: 'Show all Media' })).toBeVisible({
      timeout: timeout,
    })
    await expect(page.getByRole('link', { name: 'Show all Posts' })).toBeVisible({
      timeout: timeout,
    })
    await expect(page.getByRole('link', { name: 'Show all Carousel_images' })).toBeVisible({
      timeout: timeout,
    })
    await expect(page.getByRole('link', { name: 'Show all Pages' })).toBeVisible({
      timeout: timeout,
    })
    await expect(page.getByRole('link', { name: 'Show all Users' })).toBeVisible({
      timeout: timeout,
    })

    await page.getByRole('button', { name: 'Open Menu' }).click()
    await page.getByRole('link', { name: 'Log out' }).click()

    // admin creates a new user
    await page.waitForTimeout(3000) // 3000 ms
    await page.getByRole('textbox', { name: 'Email *' }).click()
    await page.getByRole('textbox', { name: 'Email *' }).fill('somemail@asd123.asd')
    await page.getByRole('textbox', { name: 'Email *' }).press('Tab')
    await page.getByRole('textbox', { name: 'Password' }).fill('admin')
    await page.getByRole('button', { name: 'Login' }).click()
    await page.getByRole('link', { name: 'Show all Users' }).click()
    await page.getByRole('link', { name: 'Create new User' }).click()
    await page.getByRole('textbox', { name: 'Email *' }).click()
    await page.getByRole('textbox', { name: 'Email *' }).fill(email)
    await page.getByRole('textbox', { name: 'Email *' }).press('Tab')
    await page.getByRole('textbox', { name: 'New Password' }).fill('asd')
    await page.getByRole('textbox', { name: 'Confirm Password' }).click()
    await page.getByRole('textbox', { name: 'Confirm Password' }).fill('asd')
    await page.getByRole('textbox', { name: 'Name' }).click()
    await page.getByRole('textbox', { name: 'Name' }).fill('asd')
    await page.getByRole('button', { name: 'Save' }).click()
    await page.waitForTimeout(1000) // 1000 ms
    await page.getByRole('banner').getByRole('link', { name: 'Users' }).click()
    await page.waitForTimeout(1000) // 1000 ms
    await expect(page.getByRole('cell', { name: email })).toBeVisible({ timeout: timeout })
    await expect(page.getByRole('cell', { name: 'asd' }).first()).toBeVisible({
      timeout: timeout,
    })
    await expect(page.getByRole('cell', { name: 'user' }).first()).toBeVisible({ timeout: timeout })

    // await page.getByRole('button', { name: 'Open Menu' }).click()
    await page.getByRole('link', { name: 'Log out' }).click()

    // newly created user logs in
    await page.waitForTimeout(3000) // 3000 ms
    await page.getByRole('textbox', { name: 'Email *' }).click()
    await page.getByRole('textbox', { name: 'Email *' }).fill(email)
    await page.getByRole('textbox', { name: 'Password' }).click()
    await page.getByRole('textbox', { name: 'Password' }).fill('asd')
    await page.getByRole('button', { name: 'Login' }).click()

    await page.waitForTimeout(1000) // 1000 ms
    await expect(page.getByRole('link', { name: 'Show all Media' })).toBeVisible({
      timeout: timeout,
    })
    await expect(page.getByRole('link', { name: 'Show all Posts' })).toBeVisible({
      timeout: timeout,
    })
    await expect(page.getByRole('link', { name: 'Show all Carousel_images' })).toBeVisible({
      timeout: timeout,
    })
    await expect(page.getByRole('link', { name: 'Show all Pages' })).toBeVisible({
      timeout: timeout,
    })
    await expect(page.locator('body')).toMatchAriaSnapshot(`
    - banner:
      - img
      - link "Account":
        - img "yas"
    - heading "Collections" [level=2]
    - list:
      - listitem:
        - heading "Media" [level=3]
        - link "Create new Media":
          - img
        - link "Show all Media"
      - listitem:
        - heading "Posts" [level=3]
        - link "Create new Posts":
          - img
        - link "Show all Posts"
      - listitem:
        - heading "Carousel_images" [level=3]
        - link "Create new Carousel_images":
          - img
        - link "Show all Carousel_images"
      - listitem:
        - heading "Pages" [level=3]
        - link "Show all Pages"
    `)

    // newly created user creates a post then visits it
    await page.getByRole('link', { name: 'Show all Posts' }).click()

    await page.waitForTimeout(1000) // 1000 ms

    await page.goto('http://localhost:3000/admin/collections/posts/create')
    await page.waitForTimeout(1000) // 1000 ms
    // await page.getByRole('link', { name: 'Create new Post' }).click()
    await page.getByRole('textbox', { name: 'Title *' }).click()
    await page.getByRole('textbox', { name: 'Title *' }).fill(newPageId)
    await page.getByRole('paragraph').filter({ hasText: /^$/ }).click()
    await page
      .locator('div')
      .filter({ hasText: /^Content\*Start typing, or press '\/' for commands\.\.\.\+$/ })
      .getByRole('textbox')
      .fill(newPageId)
    await page.getByRole('textbox', { name: 'Slug *' }).click()
    await page.getByRole('textbox', { name: 'Slug *' }).fill(newPageId)
    await page.getByRole('button', { name: 'Publish changes' }).click()

    await page.waitForTimeout(5000) // 5000 ms

    await page.goto(`http://localhost:3000/posts/${newPageId}`)
    await expect(page.getByRole('main')).toMatchAriaSnapshot(`
    - main:
      - heading "${newPageId}" [level=1]
      - paragraph: "${newPageId}"
    `)
  })
})
