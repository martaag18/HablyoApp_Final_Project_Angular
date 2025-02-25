import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WebinarDatesService {

  
  availableDates = signal<Date[]>([
    new Date(2025, 3, 10),
    new Date(2025, 3, 17),
    new Date(2025, 3, 24),
  ]);

  myDateFilter = (date: Date | null): boolean => {
    if (!date) return false;
    // Convertir la fecha a "YYYY-MM-DD" (sin horas)
    const time = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    ).getTime();
    return this.availableDates().some((av) => {
      const avTime = new Date(
        av.getFullYear(),
        av.getMonth(),
        av.getDate()
      ).getTime();
      return avTime === time;
    });
  };
}
