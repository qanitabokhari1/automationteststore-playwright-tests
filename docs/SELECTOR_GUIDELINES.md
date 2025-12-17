# Selector Guidelines

This document outlines best practices for selecting elements in Playwright tests.

## Selector Priority

1. **Playwright Semantic Locators** (Highest Priority)
   - `getByRole()` - For buttons, links, form elements
   - `getByText()` - For text-based selection
   - `getByLabel()` - For form labels
   - `getByPlaceholder()` - For input placeholders
   - **Why**: Most accessible, readable, and resilient to DOM changes

2. **CSS Selectors** (Second Priority)
   - Use for stable IDs: `#elementId`
   - Use for classes: `.className` or `[class*="partial"]`
   - Use for attributes: `[data-testid="value"]`
   - **Why**: Better performance, simpler syntax

3. **XPath Selectors** (Use When Needed)
   - Use for complex DOM traversal
   - Use for text-based selection when semantic locators don't work
   - Use when element doesn't have stable attributes
   - **Why**: More powerful but slower and more fragile

## Best Practices

### ✅ DO

- **Use semantic locators when possible**:
  ```typescript
  // Good
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByLabel('Username').fill('user');
  ```

- **Use stable IDs**:
  ```typescript
  // Good
  await page.locator('#loginFrm_loginname').fill('user');
  ```

- **Use data-testid attributes** (if available):
  ```typescript
  // Good
  await page.locator('[data-testid="add-to-cart"]').click();
  ```

- **Use CSS selectors for Scenario 2** (as per requirements):
  ```typescript
  // Good for Scenario 2
  await page.locator('#categorymenu nav ul li:nth-child(2)').click();
  ```

### ❌ DON'T

- **Don't use redundant prefixes**:
  ```typescript
  // Bad
  await page.locator('xpath=//div[@id="main"]');
  
  // Good
  await page.locator('//div[@id="main"]');
  ```

- **Don't use fragile selectors**:
  ```typescript
  // Bad - breaks if structure changes
  await page.locator('//div/div/div/div/div/button');
  
  // Good
  await page.getByRole('button', { name: 'Submit' });
  ```

- **Don't use hardcoded indices**:
  ```typescript
  // Bad - breaks if order changes
  await page.locator('//ul/li[3]');
  
  // Good
  await page.getByText('Specific Item').click();
  ```

- **Don't use waitForTimeout**:
  ```typescript
  // Bad
  await page.waitForTimeout(2000);
  
  // Good - Playwright auto-waits
  await page.getByRole('button').click();
  ```

## Scenario-Specific Requirements

### Scenario 1, 3, 4: Use XPath Selectors
- As per requirements, these scenarios should use XPath selectors
- Example: `//*[@id="categorymenu"]/nav/ul/li[1]`

### Scenario 2: Use CSS Selectors
- As per requirements, Scenario 2 should use CSS selectors
- Example: `#categorymenu nav ul li:nth-child(2)`
- See `utils/selectors.ts` for CSS selector constants

## Centralized Selectors

All selectors should be defined in `utils/selectors.ts` for:
- Better maintainability
- Easier updates when DOM changes
- Consistency across tests
- Reusability

## Examples

### Example 1: Login Form
```typescript
// Using semantic locators (best)
await page.getByLabel('Username').fill('user');
await page.getByLabel('Password').fill('pass');
await page.getByRole('button', { name: 'Login' }).click();

// Using CSS selectors (good)
await page.locator('#loginFrm_loginname').fill('user');
await page.locator('#loginFrm_password').fill('pass');
await page.locator('button[type="submit"]').click();

// Using XPath (acceptable if needed)
await page.locator('//input[@id="loginFrm_loginname"]').fill('user');
```

### Example 2: Navigation
```typescript
// Scenario 1, 3, 4: XPath (as required)
await page.locator('//*[@id="categorymenu"]/nav/ul/li[2]').click();

// Scenario 2: CSS (as required)
await page.locator('#categorymenu nav ul li:nth-child(2)').click();

// Better: Semantic locator (if text is stable)
await page.getByRole('link', { name: 'Apparel & Accessories' }).click();
```

## Migration Guide

When updating selectors:

1. Check if semantic locator is available
2. If not, prefer CSS over XPath
3. Use centralized selectors from `utils/selectors.ts`
4. Remove redundant prefixes (`xpath=`, `css=`)
5. Remove `waitForTimeout` calls - use Playwright's auto-waiting

## References

- [Playwright Locators](https://playwright.dev/docs/locators)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Playwright Selectors](https://playwright.dev/docs/selectors)
