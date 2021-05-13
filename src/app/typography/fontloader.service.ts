import { Injectable } from '@angular/core';
import * as WebFont from 'webfontloader';
@Injectable({
  providedIn: 'root',
})
export class FontloaderService {
  constructor() {}
  public loadFont(f: any): void {
    try {
      WebFont.load({
        google: {
          families: [
            f.header + ':' + (f.hstyle ? f.hstyle : 'regular'),
            f.body + ':' + (f.bstyle ? f.bstyle : 'regular'),
          ],
        },
      });
    } catch (e) {
      console.warn('Font Loading Failed:', f);
    }
  }
}
