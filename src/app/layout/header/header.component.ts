import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input() sidebarRef: any;
  toggleMenu() {
    if (this.sidebarRef) {
      this.sidebarRef.toggle();
    }
  }
}
