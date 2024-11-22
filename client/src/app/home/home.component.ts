import { Component, inject, OnInit } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  http = inject(HttpClient);
  registerMode = false;
  users: any;

  ngOnInit(): void {
    this.getUsers();
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  getUsers() {
    this.http.get("http://localhost:5000/api/users").subscribe({
      next: response => this.users = response,
      error: (e) => console.log("Error: ", e),
      complete: () => console.log("Success"),
    });
  }

  cancelRegisterMode(mode: boolean) {
    this.registerMode = mode;
  }
}
