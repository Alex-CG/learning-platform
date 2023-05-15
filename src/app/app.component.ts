import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterStudentModalComponent } from './register-student-modal/register-student-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'learning-platform';

  constructor(private dialog: MatDialog) { }

  openRegistrationModal(): void {
    const dialogRef = this.dialog.open(RegisterStudentModalComponent, {
      width: '500px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
