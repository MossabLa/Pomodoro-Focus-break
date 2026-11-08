import { expect, test, type Page } from '@playwright/test'

async function openProject(page: Page, name: string) {
  await page
    .getByRole('button', { name: `Explore ${name} project`, exact: true })
    .click()
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  await expect(dialog.getByRole('heading', { name, exact: true })).toBeVisible()
  return dialog
}

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
})

test('renders honest content without browser errors or horizontal overflow', async ({
  page,
}) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.reload()
  await expect(page).toHaveTitle(/Mossab Laribi/)
  await expect(
    page.getByText('Original demo projects — not client work'),
  ).toBeVisible()
  await expect(page.getByText('Not published yet')).toBeVisible()
  await expect(page.getByText('Not linked yet')).toBeVisible()
  await expect(
    page.getByRole('heading', { name: 'A practice in progress.' }),
  ).toBeVisible()
  const dimensions = await page.evaluate(() => ({
    width: innerWidth,
    page: document.documentElement.scrollWidth,
  }))
  expect(dimensions.page).toBeLessThanOrEqual(dimensions.width)
  expect(errors).toEqual([])
})

test('navigation reaches the work and contact sections', async ({
  page,
  isMobile,
}) => {
  if (isMobile)
    await page.getByRole('button', { name: 'Open navigation' }).click()
  await page.getByRole('navigation').getByRole('link', { name: /Work/ }).click()
  await expect(page).toHaveURL(/#work$/)
  if (isMobile) {
    await page.getByRole('link', { name: 'Back to top', exact: true }).click()
    await page.getByRole('button', { name: 'Open navigation' }).click()
    await page.keyboard.press('Escape')
    await expect(
      page.getByRole('button', { name: 'Open navigation' }),
    ).toBeFocused()
    await expect(page.getByRole('navigation')).not.toBeVisible()
    await page.getByRole('button', { name: 'Open navigation' }).click()
  }
  await page
    .getByRole('navigation')
    .getByRole('link', { name: /Let’s talk/ })
    .click()
  await expect(page).toHaveURL(/#contact$/)
  await expect(
    page.getByRole('link', { name: /github.com\/MossabLa/ }),
  ).toHaveAttribute('href', 'https://github.com/MossabLa')
})

test('project dialog contains case study, closes with Escape, and restores focus', async ({
  page,
}) => {
  const trigger = page.getByRole('button', {
    name: 'Explore Still. project',
    exact: true,
  })
  const dialog = await openProject(page, 'Still.')
  await expect(
    dialog.getByRole('heading', { name: 'The challenge' }),
  ).toBeVisible()
  await expect(
    dialog.getByText(/This is an original portfolio concept/),
  ).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(dialog).not.toBeVisible()
  await expect(trigger).toBeFocused()
})

test('focus timer starts, pauses, resets, and switches session types', async ({
  page,
}) => {
  const dialog = await openProject(page, 'Still.')
  const timer = dialog.locator('output')
  await expect(timer).toHaveText('25:00')
  await page.clock.install()
  await dialog
    .getByRole('button', { name: 'Start session', exact: true })
    .click()
  await page.clock.fastForward(2_500)
  await expect(timer).toHaveText('24:58')
  await dialog
    .getByRole('button', { name: 'Pause session', exact: true })
    .click()
  const paused = await timer.textContent()
  await page.clock.fastForward(5_000)
  await expect(timer).toHaveText(paused!)
  await dialog.getByRole('button', { name: 'Reset timer', exact: true }).click()
  await expect(timer).toHaveText('25:00')
  await dialog.getByRole('button', { name: 'Short break', exact: true }).click()
  await expect(timer).toHaveText('05:00')
  await dialog.getByRole('button', { name: 'Focus', exact: true }).click()
  await expect(timer).toHaveText('25:00')
})

test('timer reaches completion without going negative', async ({ page }) => {
  const dialog = await openProject(page, 'Still.')
  await page.clock.install()
  await dialog.getByRole('button', { name: 'Short break', exact: true }).click()
  await dialog
    .getByRole('button', { name: 'Start session', exact: true })
    .click()
  await page.clock.fastForward(301_000)
  await expect(dialog.locator('output')).toHaveText('00:00')
  await expect(
    dialog.getByText('Break complete. Ready for a fresh start?'),
  ).toBeVisible()
  await expect(
    dialog.getByRole('button', { name: 'Start session', exact: true }),
  ).toBeVisible()
})

test('dashboard range changes both the chart and its accessible description', async ({
  page,
}) => {
  const dialog = await openProject(page, 'Atlas')
  await expect(
    dialog.getByRole('img', { name: /Simulated request volume over 7 days/ }),
  ).toBeVisible()
  await expect(dialog.getByText('across 7 simulated days')).toBeVisible()
  await dialog.getByRole('button', { name: '30 days', exact: true }).click()
  await expect(
    dialog.getByRole('img', { name: /Simulated request volume over 30 days/ }),
  ).toBeVisible()
  await expect(dialog.getByText('across 30 simulated days')).toBeVisible()
  await expect(
    dialog.getByRole('button', { name: '30 days', exact: true }),
  ).toHaveAttribute('aria-pressed', 'true')
  await dialog.getByRole('button', { name: '7 days', exact: true }).click()
  await expect(dialog.getByText('across 7 simulated days')).toBeVisible()
})

test('task workspace validates, edits, filters, persists, and deletes a task', async ({
  page,
}) => {
  let dialog = await openProject(page, 'Forma')
  await expect(
    dialog.getByRole('button', { name: 'Add task', exact: true }),
  ).toBeDisabled()
  await dialog
    .getByRole('textbox', { name: 'New task', exact: true })
    .fill('   ')
  await expect(
    dialog.getByRole('button', { name: 'Add task', exact: true }),
  ).toBeDisabled()
  await dialog
    .getByRole('textbox', { name: 'New task', exact: true })
    .fill('Ship the accessible prototype')
  await dialog.getByRole('button', { name: 'Add task', exact: true }).click()
  await expect(
    dialog.getByRole('checkbox', {
      name: 'Ship the accessible prototype',
      exact: true,
    }),
  ).toBeVisible()
  await dialog
    .getByRole('button', {
      name: 'Edit task: Ship the accessible prototype',
      exact: true,
    })
    .click()
  await dialog
    .getByRole('textbox', { name: 'Edit task', exact: true })
    .fill('Review the accessible prototype')
  await dialog.getByRole('button', { name: 'Save', exact: true }).click()
  await dialog
    .getByRole('checkbox', {
      name: 'Review the accessible prototype',
      exact: true,
    })
    .check()
  await dialog.getByRole('button', { name: /^Open\s*\d/ }).click()
  await expect(
    dialog.getByRole('checkbox', {
      name: 'Review the accessible prototype',
      exact: true,
    }),
  ).not.toBeVisible()
  await dialog.getByRole('button', { name: /^Done\s*\d/ }).click()
  await expect(
    dialog.getByRole('checkbox', {
      name: 'Review the accessible prototype',
      exact: true,
    }),
  ).toBeChecked()
  await page.reload()
  dialog = await openProject(page, 'Forma')
  await expect(
    dialog.getByRole('checkbox', {
      name: 'Review the accessible prototype',
      exact: true,
    }),
  ).toBeChecked()
  await dialog
    .getByRole('button', {
      name: 'Delete task: Review the accessible prototype',
      exact: true,
    })
    .click()
  await expect(
    dialog.getByRole('checkbox', {
      name: 'Review the accessible prototype',
      exact: true,
    }),
  ).not.toBeVisible()
})

test('architecture illustration supports layer selection and completed traces', async ({
  page,
}) => {
  await page.getByRole('button', { name: /^03\s*Data$/ }).click()
  await expect(
    page.getByText('A foundation you can trust.', { exact: true }),
  ).toBeVisible()
  await page
    .getByRole('button', { name: 'Trace a request', exact: true })
    .click()
  await expect(
    page.getByText('Request complete. Every layer connected.', { exact: true }),
  ).toBeVisible()
  await expect(
    page.getByRole('button', { name: 'Trace again', exact: true }),
  ).toBeEnabled()
  await expect(
    page.getByRole('button', { name: /^01\s*Interface$/ }),
  ).toHaveAttribute('aria-pressed', 'true')
})

test('technical disciplines expose complete keyboard-operable tab panels', async ({
  page,
}) => {
  const frontend = page.getByRole('tab', { name: /Frontend/ })
  await frontend.focus()
  await page.keyboard.press('ArrowRight')
  await expect(page.getByRole('tab', { name: /Backend/ })).toBeFocused()
  await expect(page.getByRole('tabpanel', { name: /Backend/ })).toBeVisible()
  await expect(
    page
      .getByRole('tabpanel', { name: /Backend/ })
      .getByText('NestJS', { exact: true }),
  ).toBeVisible()
  await page.keyboard.press('End')
  await expect(page.getByRole('tab', { name: /Tools/ })).toBeFocused()
  await expect(page.getByRole('tabpanel', { name: /Tools/ })).toBeVisible()
  await page.keyboard.press('Home')
  await expect(frontend).toBeFocused()
  await expect(page.getByRole('tabpanel', { name: /Frontend/ })).toBeVisible()
  await expect(page.getByRole('tabpanel')).toHaveCount(1)
})

test('reduced motion keeps all important content and controls available', async ({
  page,
}) => {
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await expect(
    page.getByRole('heading', { name: 'Less talk. More making.' }),
  ).toBeVisible()
  await page.getByRole('link', { name: /Explore the work/ }).click()
  await expect(page).toHaveURL(/#work$/)
  await expect(
    page.getByRole('button', { name: 'Explore Atlas project', exact: true }),
  ).toBeVisible()
  await expect(
    page.getByRole('heading', { name: 'Clarity is a feature.' }),
  ).toBeVisible()
})
