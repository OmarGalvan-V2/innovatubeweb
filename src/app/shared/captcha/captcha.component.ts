import { Component, inject, Output, EventEmitter } from '@angular/core';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-captcha',
  imports: [],
  templateUrl: './captcha.component.html'
})
export class CaptchaComponent {
  @Output() tokenGenerated = new EventEmitter<string>();
  
  private _recaptchaV3Service : ReCaptchaV3Service = inject(ReCaptchaV3Service);

  public executeRecaptcha(action: string = 'submit'): void {
    this._recaptchaV3Service.execute(action).subscribe((token: string) => {
      this.tokenGenerated.emit(token);
    });
  }
}
