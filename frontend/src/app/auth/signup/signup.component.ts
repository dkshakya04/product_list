import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signupForm: any
  constructor(
    private router: Router,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobileNo: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  signup(data: any) {
    console.log(data);
    console.log(this.signupForm.valid);

    if (this.signupForm.valid) {
      this.apiService.Signup(data)
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
