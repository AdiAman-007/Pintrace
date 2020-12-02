import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private _auth:AuthenticationService
  ) {

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        userid: ['', Validators.required],
        password: ['', Validators.required]
    });
  }

  onSubmit() {
      this.submitted = true;
      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }
      this._auth.login(this.loginForm.value).subscribe(
          res => {
            localStorage.setItem('token', res.token)
            let user:any = JSON.parse(atob(res.token.split('.')[1]))
            if(user.type == 'manufacturer'){
              this.router.navigate(['/manufacturer/dashboard'])
            } else if(user.type == 'supplier'){
              this.router.navigate(['/supplier/dashboard'])
            } else {
              this.ngOnInit();
            }
          },
          err => {
            this.ngOnInit();
          }
      )
  }

}
