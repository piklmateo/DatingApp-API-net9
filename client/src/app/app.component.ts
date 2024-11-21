import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  http = inject(HttpClient);

  title = 'Hello';
  users: any;

  ngOnInit(): void {
    this.http.get("http://localhost:5000/api/users").subscribe({
      next: response => this.users = response,
      error: (e) => console.log("Error: ", e),
      complete: () => console.log("Success"),
    });
    
  }
}
