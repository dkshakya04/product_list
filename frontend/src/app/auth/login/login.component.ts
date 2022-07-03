import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: any
  constructor(
    private router: Router,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login(data: any) {
    console.log(data);
    if (this.loginForm.valid) {
      this.apiService.Login(data)
        .then((response) => {
          console.log(response);
          this.toastr.success(response.message)
          localStorage.setItem('token', response.data.token);
          this.router.navigate(['/product']);
        }).catch((error) => {
          console.log(error);
          this.toastr.error(error.message)
        })
    }
  }

}
