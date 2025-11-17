import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-delete-confirm',
  imports: [],
  templateUrl: './delete-confirm.component.html',
  styleUrl: './delete-confirm.component.css',
})
export class DeleteConfirmComponent {
  
 @Input() title: string = '';
  @Input() description: string = '';
}
