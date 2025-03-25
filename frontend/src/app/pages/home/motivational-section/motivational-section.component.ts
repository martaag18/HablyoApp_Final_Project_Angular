import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { MyButtonComponent } from '../../../shared/ui/my-button/my-button.component';
import { inject } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
@Component({
  selector: 'app-motivational-section',
  imports: [MyButtonComponent],
  templateUrl: './motivational-section.component.html',
  // styleUrls: ['./motivational-section.component.scss'],
  animations: [
    trigger('slideInLeft', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-200px)' }),
        animate(
          '800ms ease-out',
          style({ opacity: 1, transform: 'translateX(0)' })
        )
      ])
    ])
  ]
})
export class MotivationalSectionComponent {

  authService = inject(AuthService);


  sectionData = {
    title: 'Sigue Practicando',
    iconClass: 'fa-solid fa-face-smile text-4xl text-yellow-300',
    buttonLabel: '¡EMPEZAMOS!',
    buttonRoute: ['/ejercicios']
  };

  getLinkRoute(): string[] {
    return this.authService.isLoggedSignal() ? this.sectionData.buttonRoute : ['/login'];
  }
}
