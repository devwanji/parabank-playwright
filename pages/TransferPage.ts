import { Page, Locator } from '@playwright/test';

export class TransferPage {
  // Store the browser page and transfer form elements.
  readonly page: Page;
  readonly amount: Locator;
  readonly fromAccount: Locator;
  readonly toAccount: Locator;
  readonly transferButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Locate the transfer amount input.
    this.amount = page.getByRole('textbox');

    // Locate the first and second account dropdowns.
    // Using accessible roles avoids relying on incorrect HTML attributes.
    this.fromAccount = page.getByRole('combobox').nth(0);
    this.toAccount = page.getByRole('combobox').nth(1);

    // Locate the button that submits the transfer.
    this.transferButton = page.getByRole('button', {
      name: 'Transfer',
    });
  }

  // Open Transfer Funds from the main navigation menu.
  async goto() {
    await this.page
      .locator('#leftPanel')
      .getByRole('link', { name: 'Transfer Funds' })
      .click();
  }

  // Fill in the transfer details and submit the transaction.
  async transfer(
    amount: string,
    fromAccount: string,
    toAccount: string
  ) {
    await this.amount.fill(amount);
    await this.fromAccount.selectOption(fromAccount);
    await this.toAccount.selectOption(toAccount);

    await this.transferButton.click();
  }
}