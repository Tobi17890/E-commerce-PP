import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
})
export class PaymentsComponent {
  constructor (private route: Router) {}
  showLoading(event: Event, button: HTMLElement) {
    event.preventDefault(); // Prevent form submission

    button.innerHTML = 'Processing Payment...';

    setTimeout( () => {
      button.innerHTML = 'Payment completed.';
      this.route.navigate(['/']);
    }, 3000);
  }
}
