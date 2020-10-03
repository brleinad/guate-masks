import { Injectable } from '@angular/core';

let masks: Mask[] = [
  new Masks()
];

@Injectable({
  providedIn: 'root'
})
export class MasksService {

  constructor() { }

  getMasks() {
    return masks;
  }
}
