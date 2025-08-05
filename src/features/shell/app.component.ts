import { Component } from '@angular/core';
import { MainLayoutContainer } from '@features/main-layout/main-layout-container';

@Component({
  selector: 'app-root',
  imports: [MainLayoutContainer],
  template: `<app-main-layout-container/>`,
})
export class AppComponent {
  title = '';
}
