import { Injectable, computed, effect, signal } from '@angular/core';
import { Todo, CreateTodoRequest } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private _todos = signal<Todo[]>([
    {
      id: 1,
      title: 'Apprendre Angular',
      description: "Étudier les fondamentaux d'Angular 20+",
      status: 'todo',
      priority: 'high',
      createdBy: 1,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
    },
    {
      id: 2,
      title: 'Créer un projet',
      description: 'Développer une application TodoList',
      status: 'in-progress',
      priority: 'medium',
      createdBy: 1,
      createdAt: new Date('2024-01-14'),
      updatedAt: new Date('2024-01-16'),
    },
    {
      id: 3,
      title: "Configurer l'environnement",
      description: 'Installer Node.js, Angular CLI et configurer VS Code',
      status: 'done',
      priority: 'high',
      createdBy: 1,
      createdAt: new Date('2024-01-13'),
      updatedAt: new Date('2024-01-14'),
    },
  ]);

  // Expose readonly todos signal for consumers
  public todos = this._todos.asReadonly();

  // Computed signals for derived state
  public completedTodos = computed(() => this._todos().filter((todo) => todo.status === 'done'));

  public pendingTodos = computed(() => this._todos().filter((todo) => todo.status === 'todo'));

  public inProgressTodos = computed(() =>
    this._todos().filter((todo) => todo.status === 'in-progress'),
  );

  public highPriorityTodos = computed(() =>
    this._todos().filter((todo) => todo.priority === 'high'),
  );

  public todoStats = computed(() => {
    const all = this._todos();
    const completed = this.completedTodos().length;
    const inProgress = this.inProgressTodos().length;
    const pending = this.pendingTodos().length;
    const highPriority = this.highPriorityTodos().length;
    const total = all.length;
    return {
      total,
      completed,
      inProgress,
      pending,
      highPriority,
      completionRate: total > 0 ? (completed / total) * 100 : 0,
    };
  });

  constructor() {
    // Hydrate from localStorage if available
    try {
      const raw = localStorage.getItem('todos');
      if (raw) {
        const parsed: Todo[] = JSON.parse(raw);
        // Ensure Date fields are converted back to Date instances
        const hydrated = parsed.map((t) => ({
          ...t,
          createdAt: new Date(t.createdAt),
          updatedAt: new Date(t.updatedAt),
        }));
        this._todos.set(hydrated);
      }
    } catch {
      // Ignore malformed storage
    }

    // Persist and log on any todos change
    effect(() => {
      const todos = this._todos();
      // Log side-effect
      console.warn(`Todos mis à jour: ${todos.length} todos`);
      // Persist to storage
      try {
        localStorage.setItem('todos', JSON.stringify(todos));
      } catch {
        // storage might be unavailable; fail silently
      }
    });
  }

  // Simuler un délai réseau
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // GET - Récupérer tous les todos
  async getAllTodos(): Promise<Todo[]> {
    console.log('🔄 Service: Récupération de tous les todos...');
    await this.delay(300); // Simuler un appel API
    console.log('✅ Service: Todos récupérés avec succès');
    return this._todos();
  }

  // GET - Récupérer un todo par ID
  async getTodoById(id: number): Promise<Todo | undefined> {
    console.log(`🔄 Service: Récupération du todo ${id}...`);
    await this.delay(200);
    const todo = this._todos().find((t) => t.id === id);
    console.log(`✅ Service: Todo ${id} récupéré:`, todo);
    return todo;
  }

  // POST - Créer un nouveau todo
  async createTodo(todoData: CreateTodoRequest): Promise<Todo> {
    console.log("🔄 Service: Création d'un nouveau todo...", todoData);
    await this.delay(400);

    const newTodo: Todo = {
      id: Date.now(),
      title: todoData.title,
      description: todoData.description || '',
      status: 'todo',
      priority: todoData.priority,
      assignedTo: todoData.assignedTo,
      createdBy: 1, // TODO: Récupérer l'ID de l'utilisateur connecté
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this._todos.update((todos) => [...todos, newTodo]);
    console.log('✅ Service: Todo créé avec succès:', newTodo);
    return newTodo;
  }

  // PUT - Mettre à jour un todo
  async updateTodo(id: number, updates: Partial<Todo>): Promise<Todo | undefined> {
    console.log(`🔄 Service: Mise à jour du todo ${id}...`, updates);
    await this.delay(300);

    let updatedTodo: Todo | undefined;
    this._todos.update((todos) =>
      todos.map((todo) => {
        if (todo.id === id) {
          updatedTodo = {
            ...todo,
            ...updates,
            updatedAt: new Date(),
          };
          return updatedTodo;
        }
        return todo;
      }),
    );

    console.log(`✅ Service: Todo ${id} mis à jour:`, updatedTodo);
    return updatedTodo;
  }

  // DELETE - Supprimer un todo
  async deleteTodo(id: number): Promise<boolean> {
    console.log(`🔄 Service: Suppression du todo ${id}...`);
    await this.delay(250);

    let deleted = false;
    this._todos.update((todos) => {
      const initialLength = todos.length;
      const filtered = todos.filter((todo) => todo.id !== id);
      deleted = filtered.length < initialLength;
      return filtered;
    });

    console.log(`✅ Service: Todo ${id} supprimé:`, deleted);
    return deleted;
  }

  // Méthodes utilitaires
  getTodosByStatus(status: Todo['status']): Todo[] {
    return this._todos().filter((todo) => todo.status === status);
  }

  getTodosByPriority(priority: Todo['priority']): Todo[] {
    return this._todos().filter((todo) => todo.priority === priority);
  }
}
