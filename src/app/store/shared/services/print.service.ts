import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
declare var $: any;
@Injectable({ providedIn: 'root' })


export class PrintService {
  private nameSource = new BehaviorSubject<string>('');
  currentName = this.nameSource.asObservable();
  constructor() {}

  print(section: any, size: any) {
    switch (size) {
      case 'a4':
        $(section).print({
          globalStyles: true,
          mediaPrint: true,
          stylesheet: '../../assets/Styles/a4portrait.css',
          iframe: true,
          timeout: 500,
          append: null,
          prepend: null,  
          manuallyCopyFormValues: true,
          deferred: $.Deferred(),
          title: null,
          noPrintSelector: '.no-print',
          doctype: '<!doctype html>',
        });
        break;
    }
  }
  changeName(name: string) {
    this.nameSource.next(name);
  }

}
