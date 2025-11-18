import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private _messageService = inject(MessageService);

  success(message: string): void {
    this._messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: message
    });
  }

  error(message: string): void {
    this._messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message
    });
  }

  warn(message: string): void {
    this._messageService.add({
      severity: 'warn',
      summary: 'Advertencia',
      detail: message
    });
  }
}