import { test } from '@playwright/test'

test.describe('screenshot-desktop', () => {
  test.use({
    viewport: { width: 1440, height: 1024 },
  })

  test('screenshot-desktop', async ({ page, browserName }) => {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' })
    await page.waitForTimeout(1000)
    await page.screenshot({
      path: `./screenshots/desktop-${browserName}.png`,
      fullPage: false,
    })
    await page.getByText('Starry Night').click()
    await page.waitForTimeout(1000)
    await page.screenshot({
      path: `./screenshots/piece-desktop-${browserName}.png`,
      fullPage: false,
    })
    await page.getByText('View Image').click()
    await page.waitForTimeout(1000)
    await page.screenshot({
      path: `./screenshots/theater-desktop-${browserName}.png`,
      fullPage: false,
    })
  })
})

test.describe('screenshot-tablet', () => {
  test.use({
    viewport: { width: 768, height: 1280 },
  })

  test('screenshot-tablet', async ({ page, browserName }) => {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' })
    await page.waitForTimeout(1000)
    await page.screenshot({
      path: `./screenshots/tablet-${browserName}.png`,
      fullPage: false,
    })
    await page.getByText('Starry Night').click()
    await page.waitForTimeout(1000)
    await page.screenshot({
      path: `./screenshots/piece-tablet-${browserName}.png`,
      fullPage: false,
    })
    await page.getByText('View Image').click()
    await page.waitForTimeout(1000)
    await page.screenshot({
      path: `./screenshots/theater-tablet-${browserName}.png`,
      fullPage: false,
    })
  })
})

test.describe('screenshot-mobile', () => {
  test.use({
    viewport: { width: 375, height: 1150 },
  })

  test('screenshot-mobile', async ({ page, browserName }) => {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' })
    await page.waitForTimeout(1000)
    await page.screenshot({
      path: `./screenshots/mobile-${browserName}.png`,
      fullPage: false,
    })
    await page.getByText('Starry Night').click()
    await page.waitForTimeout(1000)
    await page.screenshot({
      path: `./screenshots/piece-mobile-${browserName}.png`,
      fullPage: false,
    })
    await page.getByText('View Image').click()
    await page.waitForTimeout(1000)
    await page.screenshot({
      path: `./screenshots/theater-mobile-${browserName}.png`,
      fullPage: false,
    })
  })
})
