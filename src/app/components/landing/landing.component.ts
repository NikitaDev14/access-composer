import { Component } from '@angular/core';
import {EmailService} from "../../services/email.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  public isSent = false;
  public error = false;
  public isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private emailService: EmailService,
  ) { }

  public subscriptionForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]]
  });

  public onSubmit() {
    this.subscriptionForm.controls.email.markAsTouched();

    if (this.subscriptionForm.valid) {
      this.isLoading = true;

      this.emailService.send(this.subscriptionForm.controls.email.value as string).then(() => {
        this.isSent = true;
      }).catch(() => {
        this.error = true;
      }).finally(() => {
        this.isLoading = false;
        this.subscriptionForm.reset();
      });
    }
  }
}
