import { expect } from '@wdio/globals';
import TodoPage from '../pageobjects/todo.page';

describe('SimplyDone Todo App', () => {
  beforeEach(async () => {
    await TodoPage.open();
    await browser.execute(() => localStorage.clear());
    await browser.refresh();
  });

  it('should add a new todo item', async () => {
    await TodoPage.addTodo('Buy groceries');
    await TodoPage.addTodo('Walk the dog');

    await expect(TodoPage.listItems).toBeElementsArrayOfSize(2);
    await expect(TodoPage.listItems[0]).toHaveText(
      expect.stringContaining('Buy groceries')
    );
  });

  it('should mark a todo as completed', async () => {
    await TodoPage.addTodo('Finish project');

    await TodoPage.toggleTodo(0);

    const todoSpan = TodoPage.listItems[0].$('span');
    await expect(todoSpan).toHaveElementClass('line-through');
  });

  it('should edit a todo item via double click', async () => {
    await TodoPage.addTodo('Fix bug');

    await TodoPage.editTodo(0, 'Fix critical bug');

    await expect(TodoPage.listItems[0]).toHaveText(
      expect.stringContaining('Fix critical bug')
    );
  });

  it('should delete a todo item', async () => {
    await TodoPage.addTodo('Task to delete');
    await expect(TodoPage.listItems).toBeElementsArrayOfSize(1);

    await TodoPage.deleteTodo(0);
    await expect(TodoPage.listItems).toBeElementsArrayOfSize(0);
  });

  it('should filter active and completed tasks', async () => {
    // 1. Create one active and one completed task
    await TodoPage.addTodo('Active Task');
    await TodoPage.addTodo('Completed Task');
    await TodoPage.toggleTodo(1); // Complete the second one

    // 2. Filter by Active
    await TodoPage.btnFilterActive.click();
    await expect(TodoPage.listItems).toBeElementsArrayOfSize(1);
    await expect(TodoPage.listItems[0]).toHaveText(
      expect.stringContaining('Active Task')
    );

    // 3. Filter by Completed
    await TodoPage.btnFilterCompleted.click();
    await expect(TodoPage.listItems).toBeElementsArrayOfSize(1);
    await expect(TodoPage.listItems[0]).toHaveText(
      expect.stringContaining('Completed Task')
    );
  });
});
