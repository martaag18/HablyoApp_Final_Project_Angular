import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { inject } from '@angular/core';
import { Webinar } from '../../../shared/interfaces/webinar.interface';
import { RouterLink } from '@angular/router';
import { WebinarService } from '../../../services/webinars.service';


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
