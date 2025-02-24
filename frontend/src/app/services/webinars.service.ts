import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebinarService {

  private upcomingDates = [
    {
      date: new Date(2023, 9, 10),
      label: 'Hablar sin bloqueos',
      description: 'Conéctate en vivo con el logopeda Savio Mascolo y descubre su experiencia para superar la tartamudez y hablar sin bloqueos.'
    },
    {
      date: new Date(2023, 9, 17),
      label: 'Hablar sin bloqueos',
      description: 'Conéctate en vivo con el logopeda Savio Mascolo y descubre su experiencia para superar la tartamudez y hablar sin bloqueos.'
    },
    {
      date: new Date(2023, 9, 24),
      label: 'Hablar sin bloqueos',
      description: 'Conéctate en vivo con el logopeda Savio Mascolo y descubre su experiencia para superar la tartamudez y hablar sin bloqueos.'
    },
  ];

  getUpcomingDates() {
    return this.upcomingDates;
  }
}
