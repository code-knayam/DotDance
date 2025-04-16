import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private isLoading = new BehaviorSubject<boolean>(false);

  /**
   * Observable to track the loading state
   */
  readonly loading$: Observable<boolean> = this.isLoading.asObservable();

  /**
   * Show the loader
   */
  show(): void {
    this.isLoading.next(true);
  }

  /**
   * Hide the loader
   */
  hide(): void {
    this.isLoading.next(false);
  }

  /**
   * Wrap an async operation with the loader
   * @param operation The async operation to wrap
   * @returns The result of the operation
   */
  async withLoader<T>(operation: () => Promise<T>): Promise<T> {
    try {
      this.show();
      return await operation();
    } finally {
      this.hide();
    }
  }
} 