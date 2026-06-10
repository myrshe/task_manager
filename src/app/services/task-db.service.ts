import { Injectable } from '@angular/core';
import { openDB, DBSchema } from 'idb';

import { Task } from '../models/task.model';

interface TaskManagerDb extends DBSchema {
  tasks: {
    key: string;
    value: Task;
  };
}

@Injectable({
  providedIn: 'root',
})
export class TaskDbService {
  private readonly dbPromise = openDB<TaskManagerDb>('task-manager-db', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('tasks')) {
        db.createObjectStore('tasks', {
          keyPath: 'id',
        });
      }
    },
  });

  async getAllTasks(): Promise<Task[]> {
    const db = await this.dbPromise;
    return db.getAll('tasks');
  }

  async addTask(task: Task): Promise<void> {
    const db = await this.dbPromise;
    await db.add('tasks', task);
  }

  async updateTask(task: Task): Promise<void> {
    const db = await this.dbPromise;
    await db.put('tasks', task);
  }

  async deleteTask(id: string): Promise<void> {
    const db = await this.dbPromise;
    await db.delete('tasks', id);
  }

  async clearTasks(): Promise<void> {
    const db = await this.dbPromise;
    await db.clear('tasks');
  }
}
