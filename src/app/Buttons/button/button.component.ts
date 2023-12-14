import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() label: any = null;
  @Input() ionicon: any = null;
  @Input() transparent: boolean = false;
  @Input() rounded: boolean = false;
  @Input() primary: boolean = false;
  @Input() disabled: boolean = false;
  @Input() process: boolean = false;
  @Input() type: 'submit'|'button' = 'button';
  @Output() onPress: EventEmitter<any> = new EventEmitter();
}
