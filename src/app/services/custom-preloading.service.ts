import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';
export declare var navigator: any;

@Injectable({
  providedIn: 'root',
})
export class CustomPreloadingService implements PreloadingStrategy {
  preload(route: Route, fn: () => Observable<any>): Observable<any> {
    if (this.hasGoodConnection()) {
      return fn();
    }

    return of(null);
  }

  hasGoodConnection(): boolean {
    const conn = navigator.connection;
    if (conn) {
      const slowerConnection = ['slow-2g', '2g', '3g'];
      const effectiveConnection = conn.effectiveType || '';
      if (slowerConnection.includes(effectiveConnection)) {
        return false;
      }
    }
    return true;
  }
}
