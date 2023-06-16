import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-create-mail',
  templateUrl: './create-mail.component.html',
  styleUrls: ['./create-mail.component.scss']
})
export class CreateMailComponent {

  mail = {
    to: '',
    cc: '',
    bcc: '',
    subject: '',
    body: '',
    attachments: ''
  };

  constructor(private authService: AuthenticationService, private router: Router) { }

  sendMail() {
    // Implement the logic to send the mail
  }

  //goes back to the login page after logout
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }


}
