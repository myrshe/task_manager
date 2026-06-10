import { Injectable, inject, signal } from '@angular/core';

import { Task } from '../models/task.model';
import { MOCK_TASKS } from './task.mock';
import { TaskDbService } from './task-db.service';

export type TaskSortField = 'deadline' | 'priority';
export type SortDirection = 'asc' | 'desc';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly taskDbService = inject(TaskDbService);

  private readonly tasksState = signal<Task[]>([]);
  private readonly initializedState = signal(false);

  readonly tasks = this.tasksState.asReadonly();
  readonly initialized = this.initializedState.asReadonly();

  async initTasks(): Promise<void> {
    const savedTasks = await this.taskDbService.getAllTasks();

    if (savedTasks.length > 0) {
      this.tasksState.set(savedTasks);
    } else {
      this.tasksState.set(MOCK_TASKS);

      for (const task of MOCK_TASKS) {
        await this.taskDbService.addTask(task);
      }
    }

    this.initializedState.set(true);
  }

  getTasks(): Task[] {
    return this.tasks();
  }

  getTaskById(id: string): Task | undefined {
    return this.tasks().find((task) => task.id === id);
  }

  async addTask(task: Omit<Task, 'id'>): Promise<void> {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
    };

    this.tasksState.update((tasks) => [...tasks, newTask]);
    await this.taskDbService.addTask(newTask);
  }

  async updateTask(updatedTask: Task): Promise<void> {
    this.tasksState.update((tasks) =>
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );

    await this.taskDbService.updateTask(updatedTask);
  }

  async deleteTask(id: string): Promise<void> {
    this.tasksState.update((tasks) => tasks.filter((task) => task.id !== id));
    await this.taskDbService.deleteTask(id);
  }

  getTasksByDate(date: string): Task[] {
    return this.tasks().filter((task) => {
      return this.getDatePart(task.deadline) === date;
    });
  }

  getTasksByDateRange(dateFrom: string, dateTo: string): Task[] {
    const from = new Date(dateFrom).getTime();
    const to = new Date(dateTo).getTime();

    return this.tasks().filter((task) => {
      const taskDate = new Date(this.getDatePart(task.deadline)).getTime();
      return taskDate >= from && taskDate <= to;
    });
  }

  getTodayTasks(): Task[] {
    const today = this.formatDate(new Date());
    return this.getTasksByDate(today);
  }

  getWeekTasks(): Task[] {
    const today = new Date();

    const startOfWeek = new Date(today);
    const day = today.getDay() || 7;
    startOfWeek.setDate(today.getDate() - day + 1);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    return this.getTasksByDateRange(this.formatDate(startOfWeek), this.formatDate(endOfWeek));
  }

  getMonthTasks(): Task[] {
    const today = new Date();

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    return this.getTasksByDateRange(this.formatDate(startOfMonth), this.formatDate(endOfMonth));
  }

  getTopTasks(limit = 5): Task[] {
    const activeTasks = this.tasks().filter((task) => task.status !== 'done');
    return this.sortByPriority(activeTasks, 'desc').slice(0, limit);
  }

  getTasksToStart(limit = 5): Task[] {
    return this.tasks()
      .filter((task) => task.status === 'todo')
      .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
      .slice(0, limit);
  }

  sortByDeadline(tasks: Task[], direction: SortDirection): Task[] {
    return [...tasks].sort((a, b) => {
      const firstDate = new Date(a.deadline).getTime();
      const secondDate = new Date(b.deadline).getTime();

      return direction === 'asc' ? firstDate - secondDate : secondDate - firstDate;
    });
  }

  sortByPriority(tasks: Task[], direction: SortDirection): Task[] {
    const priorityWeight: Record<Task['priority'], number> = {
      low: 1,
      medium: 2,
      high: 3,
    };

    return [...tasks].sort((a, b) => {
      const firstPriority = priorityWeight[a.priority];
      const secondPriority = priorityWeight[b.priority];

      return direction === 'asc' ? firstPriority - secondPriority : secondPriority - firstPriority;
    });
  }

  sortTasks(tasks: Task[], field: TaskSortField, direction: SortDirection): Task[] {
    if (field === 'deadline') {
      return this.sortByDeadline(tasks, direction);
    }

    return this.sortByPriority(tasks, direction);
  }

  private getDatePart(dateTime: string): string {
    return dateTime.split('T')[0];
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}
