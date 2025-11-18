import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { environment } from '../../enviroments/enviroments';

declare var grecaptcha: any;

@Component({
  selector: 'app-captcha',
  imports: [],
  templateUrl: './captcha.component.html'
})
export class CaptchaComponent implements OnDestroy {
  @Output() tokenGenerado: EventEmitter<string> = new EventEmitter<string>();
  
  private claveSitio: string = environment.RECAPTCHA_SITE_KEY;
  private scriptElement: HTMLScriptElement | null = null;

  ngOnDestroy(): void {
    this.limpiarRecaptcha();
  }

  private limpiarRecaptcha(): void {
    if (this.scriptElement) {
      document.head.removeChild(this.scriptElement);
      this.scriptElement = null;
    }
    
    // Remover el badge de reCAPTCHA
    const badge = document.querySelector('.grecaptcha-badge');
    if (badge) {
      badge.remove();
    }
  }

  public ejecutarRecaptcha(): void {
    if (typeof grecaptcha !== 'undefined') {
      this.ejecutarRecaptchaInterno();
    } else {
      this.cargarScriptRecaptcha().then(() => {
        this.ejecutarRecaptchaInterno();
      });
    }
  }

  private cargarScriptRecaptcha(): Promise<void> {
    return new Promise((resolve) => {
      this.scriptElement = document.createElement('script');
      this.scriptElement.src = `https://www.google.com/recaptcha/api.js?render=${this.claveSitio}`;
      this.scriptElement.async = true;
      this.scriptElement.defer = true;
      this.scriptElement.onload = () => resolve();
      document.head.appendChild(this.scriptElement);
    });
  }

  private ejecutarRecaptchaInterno(): void {
    grecaptcha.ready(() => {
      grecaptcha.execute(this.claveSitio, { action: 'submit' }).then((token: string) => {
        this.tokenGenerado.emit(token);
      });
    });
  }
}
