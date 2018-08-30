import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'


@Component({
  selector: 'app-logging',
  templateUrl: './logging.component.html',
  styleUrls: ['./logging.component.css']
})
export class LoggingComponent implements OnInit {
  email: String;
  password: String;

  constructor(
    private authService : AuthService,
    private router : Router
  ) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    const user = {
      email: this.email,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(data => {
        if (data.success) {
          this.authService.storeUserData(data.token, data.user);
          console.log('You are logged in');
          this.router.navigate(['subject']);
        }
        else {
          console.log(data.msg);
          this.router.navigate(['login']);
        }
    })
  }

}
