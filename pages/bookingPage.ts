import { Page, expect } from '@playwright/test';

export class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async loadWeb(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async clickOn(selector: string): Promise<void> {
        await this.page.click(selector);
    }

    async fillField(selector: string, value: string): Promise<void> {
        await this.page.locator(selector).fill(value);
    }

    async getTitle(): Promise<string> {
        return this.page.title();
    }

    async getUrl(): Promise<string> {
        return this.page.url();
    }
    
    async selectOption(selector: string, value: string): Promise<void> {
        await this.page.locator(selector).selectOption(value);
    }

    async expectVisible(selector: string): Promise<void> {
        await expect(this.page.locator(selector)).toBeVisible();
    }
}
