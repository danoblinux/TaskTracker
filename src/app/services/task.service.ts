import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from 'src/app/types/Task';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private API_URL = 'http://localhost:5000/tasks';

  constructor(private httpClient: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.API_URL);
  }

  addTask(task: Task): Observable<Task> {
    return this.httpClient.post<Task>(`${this.API_URL}`, task, httpOptions);
  }

  deleteTask(task: Task): Observable<Task> {
    return this.httpClient.delete<Task>(`${this.API_URL}/${task.id}`);
  }

  updateTask(task: Task): Observable<Task> {
    return this.httpClient.put<Task>(
      `${this.API_URL}/${task.id}`,
      task,
      httpOptions
    );
  }
}
