import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {
  @Output() stopSearch = new EventEmitter<boolean>();
  constructor() { }
  public stop() { 
    this.stopSearch.emit(true);
  }
}
