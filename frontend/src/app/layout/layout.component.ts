import { ChangeDetectorRef, Component } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { routeTransitionAnimations } from '../shared/animations/route-animations';
import { inject } from '@angular/core';

@Component({
  selector: 'app-layout',
  imports: [NavbarComponent, FooterComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  // styleUrl: './layout.component.scss',
  animations: [routeTransitionAnimations]

})
export class LayoutComponent {

  private cdr = inject(ChangeDetectorRef)

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
  getAnimationData(outlet: RouterOutlet) {
    return outlet.activatedRouteData?.['animation'] || 'NoAnimation';
  }
}
