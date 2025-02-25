import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { inject } from '@angular/core';
import { WebinarService } from '../../../services/webinar-info.service';
import { Webinar } from '../../../shared/interfaces/webinar.interface';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-upcoming-webinars',
  imports: [CommonModule, RouterLink],
  templateUrl: './upcoming-webinars.component.html',
  styleUrl: './upcoming-webinars.component.scss'
})
export class UpcomingWebinarsComponent {

  private webinarService = inject(WebinarService);
  upcomingDates: Webinar[] = [];


  ngOnInit() {
    this.upcomingDates = this.webinarService.getUpcomingDates();
  }
}
