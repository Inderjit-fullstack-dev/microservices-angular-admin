import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: new FormControl('john@mail.com', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('12345', [Validators.required]),
    });
  }

  login() {
    if (!this.loginForm.valid) return;
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe((result) => {
      console.log(result);
    });
  }
}
