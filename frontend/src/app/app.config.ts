import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), //configura modo en que Angular detecta cambios a través de Zone.js
    provideRouter(routes), //Registramos Router de Angular usando las rutas definidas en app.routes.ts
    provideHttpClient(withFetch()), //Habilitamos HTTPClient en toda la aplicación
    importProvidersFrom(BrowserAnimationsModule), //Habilitamos animaciones de Angular
  ]
};
