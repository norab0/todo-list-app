import { TestBed } from '@angular/core/testing';
import { WritableSignal } from '@angular/core';
import { TodoService } from './todo.service';
import { Todo } from '../models/todo.model';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    // Ensure localStorage does not interfere with initial state
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(localStorage, 'setItem').and.stub();

    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add todo via createTodo and return it', async () => {
    const created = await service.createTodo({
      title: 'Test Todo',
      description: 'Test Description',
      priority: 'medium',
    });
    const all = await service.getAllTodos();
    expect(all.find((t) => t.id === created.id)).toBeTruthy();
  });

  it('should compute completed, pending and in-progress correctly', async () => {
    // start from empty list
    (service as unknown as { _todos: WritableSignal<Todo[]> })._todos.set([]);

    const base: Omit<Todo, 'id'> = {
      title: 'X',
      description: '',
      status: 'todo',
      priority: 'low',
      createdBy: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    (service as unknown as { _todos: WritableSignal<Todo[]> })._todos.set([
      { ...base, id: 1, status: 'done', priority: 'high' },
      { ...base, id: 2, status: 'todo', priority: 'medium' },
      { ...base, id: 3, status: 'in-progress', priority: 'high' },
    ]);

    expect(service.completedTodos().length).toBe(1);
    expect(service.pendingTodos().length).toBe(1);
    expect(service.inProgressTodos().length).toBe(1);
    const stats = service.todoStats();
    expect(stats.total).toBe(3);
    expect(stats.completed).toBe(1);
    expect(stats.pending).toBe(1);
    expect(stats.inProgress).toBe(1);
    expect(stats.highPriority).toBe(2);
  });
});
