import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { inject } from '@angular/core';
import { WebinarService } from '../../../services/webinars.service';
import { Webinar } from '../../../shared/interfaces/webinar.interface';


@Component({
  selector: 'app-upcoming-webinars',
  imports: [CommonModule],
  templateUrl: './upcoming-webinars.component.html',
  styleUrl: './upcoming-webinars.component.scss'
})
export class UpcomingWebinarsComponent {

  private webinarService = inject(WebinarService);
  upcomingDates: Webinar[] = [];


  ngOnInit() {
    this.upcomingDates = this.webinarService.getUpcomingDates();
  }

  onSignup(item: { date: Date; label: string; description: string }) {
    alert(`Te has inscrito en: ${item.label}`);
  }
}
