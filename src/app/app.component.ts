import { ChangeDetectionStrategy, Component } from '@angular/core';
import Matercolor from 'matercolors'; // to generate palette
import tinycolor from 'tinycolor2'; // to create colors
import ColorCombos from 'color-combos'; //for color combo assesability
import { Options } from '@angular-slider/ngx-slider'; // slider
import * as WebFontLoader from 'webfontloader';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ConditionalExpr } from '@angular/compiler';

// declare const writeJsonFile: any;
// declare const tinycolor: any;
/* var tinycolor = require('tinycolor2');
var color = tinycolor('red');
console.log(color); */
export interface Color {
  name: string;
  hex: string;
  darkContrast: boolean;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'eva-nebular';
  primaryPaletterArr = [];
  secPaletterArr = [];
  color = '#3171e0';
  primaryMaterColor: any;
  primartPaletteMater: any;
  secPaletteMater: any;

  // Custom palette generator
  primaryColor = '#3171e0';
  primaryTextColor;
  primaryColorPalette: Color[] = [];
  secondaryColor = '#3dc2ff';
  secondaryColorPalette: Color[] = [];
  backgroundColor = '#000000';

  form: FormGroup;

  /* form = new FormGroup({
    gender: new FormControl('', Validators.required),
  }); */
  get f() {
    return this.form.controls;
  }

  buttonClass: string = 'primary';

  // Slider
  sliderValue: number = 5;
  sliderOptions: Options = {
    // showTicksValues: true,
    floor: 0,
    ceil: 20,
  };
  sliderValueSpacing: number = 8;
  sliderOptionsSpacing: Options = {
    // showTicksValues: true,
    floor: 8,
    ceil: 24,
    step: 8,
  };

  isFontsLoaded = false;
  constructor(fb: FormBuilder) {
    this.generateColorCombo();

    this.generatePrimaryPalette();
    this.generateSecondaryPalette();
    this.setBGandFontColor();
    // Check Color combo
    const sampleCombo = ColorCombos(['#006bb6', '#ffffff'], { compact: true });
    console.log(`sampleCombo, ${sampleCombo}`);
    console.log(sampleCombo);

    this.form = fb.group({
      variant: ['primary', Validators.required],
    });
    this.loadFonts();
  }
  loadFonts() {
    WebFontLoader.load({
      active: () => {
        this.isFontsLoaded = true;
      },
      google: {
        families: ['Monoton', 'Droid Sans', 'Montserrat:wght@100;700'],
      },
    });
  }
  setBGandFontColor() {
    document.documentElement.style.setProperty(
      '--theme-body-background-color',
      '#ebebeb'
    );
    document.documentElement.style.setProperty('--theme-font-color', '#1f1f1f');
    document.documentElement.style.setProperty('--theme-border-radius', '8px');
  }
  generateJSON() {
    const sampleJSON = [];
    const styleObj = document.documentElement.style;
    for (var e in styleObj) {
      if (styleObj[e] != null) {
        const keyName = styleObj[e].toString();
        if (keyName && keyName?.indexOf('--theme-') > -1) {
          const value = getComputedStyle(
            document.documentElement
          ).getPropertyValue(keyName);
          let sampleObj = {};
          sampleObj[keyName] = value;
          sampleJSON.push(sampleObj);
        }
      }
    }
    sampleJSON.pop();
    console.log('');
    console.log(sampleJSON);
    this.saveJSON(JSON.stringify(sampleJSON), 'config.json');
  }
  saveJSON(data, filename) {
    var a = document.createElement('a');
    a.setAttribute(
      'href',
      'data:text/plain;charset=utf-u,' + encodeURIComponent(data)
    );
    a.setAttribute('download', filename);
    a.click();
  }
  generatePrimaryPalette() {
    this.primaryColorPalette = computeColors(this.primaryColor);
    for (const color of this.primaryColorPalette) {
      const key1 = `--theme-primary-${color.name}`;
      const value1 = color.hex;
      const key2 = `--theme-primary-contrast-${color.name}`;
      const value2 = color.darkContrast ? 'rgba(black, 0.87)' : 'white';
      document.documentElement.style.setProperty(key1, value1);
      document.documentElement.style.setProperty(key2, value2);
    }
  }

  generateSecondaryPalette() {
    this.secondaryColorPalette = computeColors(this.secondaryColor);

    for (const color of this.secondaryColorPalette) {
      const key1 = `--theme-secondary-${color.name}`;
      const value1 = color.hex;
      const key2 = `--theme-secondary-contrast-${color.name}`;
      const value2 = color.darkContrast ? 'rgba(black, 0.87)' : 'white';
      document.documentElement.style.setProperty(key1, value1);
      document.documentElement.style.setProperty(key2, value2);
    }
  }

  submit() {
    console.log(this.form.value);
  }

  changeVariant(e) {
    console.log(e.target.value);
    this.buttonClass = e.target.value;
  }
  sliderChange(e) {
    console.log(e);
    document.documentElement.style.setProperty(
      '--theme-border-radius',
      e + 'px'
    );
  }
  sliderChangeSpacing(e) {
    console.log(e);
    document.documentElement.style.setProperty('--spacing', e + 'px');
  }
  generateColorCombo() {
    this.primaryPaletterArr = [];
    this.secPaletterArr = [];
    this.primaryMaterColor = new Matercolor(this.primaryColor, {
      threshold: 128,
      showContrastText: true,
    });
    this.primartPaletteMater = this.primaryMaterColor.palette.analogous.primary;
    this.secPaletteMater = this.primaryMaterColor.palette.analogous.secondary;
    console.log(this.primaryMaterColor);
    for (var e in this.primartPaletteMater) {
      this.primaryPaletterArr.push(this.primartPaletteMater[e]);
    }
    for (var e in this.secPaletteMater) {
      this.secPaletterArr.push(this.secPaletteMater[e]);
    }
    console.log(this.primaryPaletterArr);
  }
  primaryColorChange(e) {
    this.primaryColor = e;
    this.generatePrimaryPalette();
    this.generateColorCombo();
    // this.generateSecondaryPalette();
  }
  secondaryColorChange(e) {
    this.secondaryColor = e;
    this.generateSecondaryPalette();
  }
  switchDarkMode(e) {
    const bgColor = e.target.checked ? '#1f1f1f' : '#ebebeb';
    const fontColor = !e.target.checked ? '#1f1f1f' : '#ebebeb';
    document.documentElement.style.setProperty(
      '--theme-body-background-color',
      bgColor
    );
    document.documentElement.style.setProperty('--theme-font-color', fontColor);
  }
}

function computeColors(hex: string): Color[] {
  return [
    getColorObject(tinycolor(hex).lighten(52), '50'),
    getColorObject(tinycolor(hex).lighten(37), '100'),
    getColorObject(tinycolor(hex).lighten(26), '200'),
    getColorObject(tinycolor(hex).lighten(12), '300'),
    getColorObject(tinycolor(hex).lighten(6), '400'),
    getColorObject(tinycolor(hex), '500'),
    getColorObject(tinycolor(hex).darken(6), '600'),
    getColorObject(tinycolor(hex).darken(12), '700'),
    getColorObject(tinycolor(hex).darken(18), '800'),
    getColorObject(tinycolor(hex).darken(24), '900'),
    getColorObject(tinycolor(hex).lighten(50).saturate(30), 'A100'),
    getColorObject(tinycolor(hex).lighten(30).saturate(30), 'A200'),
    getColorObject(tinycolor(hex).lighten(10).saturate(15), 'A400'),
    getColorObject(tinycolor(hex).lighten(5).saturate(5), 'A700'),
  ];
}

function getColorObject(value, name): Color {
  const c = tinycolor(value);
  return {
    name: name,
    hex: c.toHexString(),
    darkContrast: c.isLight(),
  };
}
