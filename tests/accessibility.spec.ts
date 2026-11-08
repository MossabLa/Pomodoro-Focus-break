import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('page and all interactive demonstrations pass automated accessibility checks', async ({
  page,
}) => {
  await page.goto('/')
  for (const project of ['home', 'Still.', 'Atlas', 'Forma']) {
    if (project !== 'home') {
      await page
        .getByRole('button', {
          name: `Explore ${project} project`,
          exact: true,
        })
        .click()
      await expect(page.getByRole('dialog')).toBeVisible()
      await page.locator('.dialog-demo').scrollIntoViewIfNeeded()
      await expect(page.getByText('Preparing the demo…')).toHaveCount(0)
    }
    const result = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze()
    expect(result.violations, `${project} accessibility violations`).toEqual([])
    if (project !== 'home') await page.keyboard.press('Escape')
  }
})
