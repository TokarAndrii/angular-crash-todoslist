import { Component, OnInit } from "@angular/core";
import { TodoService } from "../../services/todo.service";
import { Todo } from "../../models/Todo";

@Component({
  selector: "app-todos",
  templateUrl: "./todos.component.html",
  styleUrls: ["./todos.component.css"]
})
export class TodosComponent implements OnInit {
  todos: Todo[];
  //https://stackoverflow.com/questions/35763730/difference-between-constructor-and-ngoninit
  // mostly used to import services
  //called first time before the ngOnInit()
  constructor(private todoService: TodoService) {}

  //ngOnInit is a life cycle hook called by Angular2 to indicate that Angular is done creating the component.
  //called after the constructor and called  after the first ngOnChanges()
  ngOnInit() {
    this.todoService.getTodos().subscribe(todos => {
      return (this.todos = todos);
    });
  }

  deleteTodo(todo: Todo) {
    this.todos = this.todos.filter(curr => curr.id !== todo.id);
    this.todoService.deleteTodo(todo).subscribe();
  }

  addTodo(todo: Todo) {
    this.todoService.addTodo(todo).subscribe(todo => {
      this.todos.push(todo);
    });
  }
}
