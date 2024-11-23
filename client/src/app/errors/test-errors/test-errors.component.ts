import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-test-errors',
  standalone: true,
  imports: [],
  templateUrl: './test-errors.component.html',
  styleUrl: './test-errors.component.css'
})
export class TestErrorsComponent {
  baseURL = "http://localhost:5000/api";
  private http = inject(HttpClient);
  validationErrors: string[] = [];

  get500Error() {
    this.http.get(this.baseURL + "/buggy/server-error").subscribe({
      next: res => console.log(res),
      error: err => console.log(err),
    })
  }

  get404Error() {
    this.http.get(this.baseURL + "/buggy/not-found").subscribe({
      next: res => console.log(res),
      error: err => console.log(err),
    })
  }

  get401Error() {
    this.http.get(this.baseURL + "/buggy/auth").subscribe({
      next: res => console.log(res),
      error: err => console.log(err),
    })
  }

  get400ValidationError() {
    this.http.get(this.baseURL + "/account/register", {}).subscribe({
      next: res => console.log(res),
      error: err => {
        console.log(err);
        this.validationErrors = err;
      }
    })
  }
}
