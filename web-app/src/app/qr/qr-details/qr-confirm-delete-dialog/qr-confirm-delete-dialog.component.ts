import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'confirm-delete-dialog',
  template: `
    <h2 mat-dialog-title>Delete QR Code</h2>
    <mat-dialog-content>
      Are you sure you want to delete this QR code?
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-raised-button color="warn" [mat-dialog-close]="true">
        Delete
      </button>
    </mat-dialog-actions>
  `,
  imports: [MatDialogModule, MatButtonModule],
})
export class ConfirmDeleteDialog {}
