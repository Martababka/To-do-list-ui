import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {finalize, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly API = "/api/tasks";
  private readonly HOST_URL = "http://localhost:8080";

  private http = inject(HttpClient);
  private loading = signal(true);

  public getToDoList() {

    return this.http.get<TaskModel[]>(this.HOST_URL + this.API).pipe(
      finalize(() => this.loading.set(false)))
  }

  getById(id: number): Observable<TaskModel> {
    this.loading.set(true);
    return this.http.get<TaskModel>(`${this.HOST_URL + this.API}/${id}`).pipe(
      finalize(() => this.loading.set(false)))
  }

  createTask(task: TaskModel): Observable<TaskModel> {
    return this.http.post<TaskModel>(this.HOST_URL + this.API, task);
  }
}
