import { $ } from '@wdio/globals';
import Page from './page.ts';

class TodoPage extends Page {
  /**
   * define selectors using getter methods
   */
  public get inputTodo() {
    return $('input[placeholder="Add a task..."]');
  }

  public get btnAdd() {
    return $('button[aria-label="Add task"]');
  }

  public get listItems() {
    return $$('li');
  }

  public get btnFilterActive() {
    return $('button[aria-label="Show active tasks"]');
  }

  public get btnFilterCompleted() {
    return $('button[aria-label="Show completed tasks"]');
  }

  public get btnFilterAll() {
    return $('button[aria-label="Show all tasks"]');
  }

  /**
   * Helper to get a specific task text by index
   */
  public async getTodoText(index: number) {
    // We find the <span> inside the specific <li>
    return this.listItems[index].$('span').getText();
  }

  /**
   * Actions
   */
  public async open() {
    return super.open('http://localhost:5173');
  }

  public async addTodo(text: string) {
    await this.inputTodo.setValue(text);
    await this.btnAdd.click();
  }

  public async toggleTodo(index: number) {
    await this.listItems[index].$('input[type="checkbox"]').click();
  }

  public async deleteTodo(index: number) {
    await this.listItems[index].$('button[aria-label="Delete task"]').click();
  }

  public async editTodo(index: number, newText: string) {
    const item = this.listItems[index].$('span');
    await item.doubleClick();

    // Wait for the input to appear (switches from span to input)
    const editInput = this.listItems[index].$('input[type="text"]');
    await editInput.waitForDisplayed();

    // Clear and set new value
    await editInput.click();
    await browser.keys(['Control', 'a']);
    await browser.keys('Backspace');
    await editInput.addValue(newText);

    // Press Enter to save
    await browser.keys('Enter');
  }
}

export default new TodoPage();
