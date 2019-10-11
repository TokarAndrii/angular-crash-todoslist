import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Todo } from "../models/Todo";
const httpOptions = {
  headers: new HttpHeaders({
    "Content-type": "application/json"
  })
};

@Injectable({
  providedIn: "root"
})
export class TodoService {
  todosUrl: string = "https://jsonplaceholder.typicode.com/todos";
  todosLimit: number = 10;
  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.todosUrl}?_limit=${this.todosLimit}`);
  }

  toggleCompleted(todo: Todo): Observable<any> {
    return this.http.put<Todo>(
      `${this.todosUrl}/${todo.id}`,
      todo,
      httpOptions
    );
  }

  deleteTodo(todo: Todo): Observable<Todo> {
    return this.http.delete<Todo>(`${this.todosUrl}/${todo.id}`, httpOptions);
  }
}
