import { Component, OnInit } from '@angular/core';
import { FontloaderService } from './fontloader.service';

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.scss'],
})
export class TypographyComponent implements OnInit {
  name = 'Angular';
  selected;
  idx = 0;
  pairs = [
    { header: 'Oswald', body: 'EB Garamond' },
    { header: 'Oswald', body: 'Cardo' },
    { header: 'Open Sans', body: 'Open Sans Condensed' },
    { header: 'Raleway', body: 'Roboto Slab' },
    { header: 'Roboto', body: 'Roboto Condensed' },
    { header: 'Playfair Display', body: 'Source Sans Pro' },
    { header: 'Playfair Display', body: 'Chivo' },
    { header: 'Alegreya', body: 'Lato' },
    { header: 'Fjalla One', body: 'Noto Sans' },
    { header: 'PT Sans', body: 'PT Sans Narrow' },
    { header: 'Josefin Sans', body: 'Amatic SC' },
    { header: 'Merriweather', body: 'Montserrat' },
    {
      header: 'Quicksand',
      hstyle: 'medium',
      body: 'Quickand',
      bstyle: 'light',
    },
    { header: 'Archivo Black', body: 'Judson' },
    { header: 'Crimson Text', body: 'Work Sans' },
    { header: 'Abril Fatface', body: 'Roboto', bstyle: 'light' },
    { header: 'Archivo', hstyle: 'medium', body: 'Open Sans', bstyle: 'light' },
    { header: 'Montserrat', body: 'Work Sans' },
    { header: 'Montserrat', body: 'Lora' },
    { header: 'Prata', body: 'Lato' },
  ];
  constructor(private fontService: FontloaderService) {
    this.setPair();
  }
  ngOnInit() {}
  setPair() {
    this.selected = this.pairs[this.idx];
    this.fontService.loadFont(this.selected);
  }

  onClick(n: number) {
    this.idx;
    if (this.idx + n < 0) {
      this.idx = this.pairs.length - 1;
    } else if (this.idx + n > this.pairs.length - 1) {
      this.idx = 0;
    } else {
      this.idx += n;
    }
    this.setPair();
  }
}
