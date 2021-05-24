import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from "@angular/core";
import Matercolor from "matercolors"; // to generate palette
import tinycolor from "tinycolor2"; // to create colors
import ColorCombos from "color-combos"; //for color combo assesability
import { Options } from "@angular-slider/ngx-slider"; // slider
import * as WebFontLoader from "webfontloader";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { ConditionalExpr } from "@angular/compiler";
import { FontloaderService } from "./typography/fontloader.service";
import { fromEvent } from "rxjs";

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
  selector: "app-root",
  templateUrl: "./app.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements AfterViewInit {
  title = "eva-nebular";
  primaryPaletterArr = [];
  secPaletterArr = [];
  color = "#3171e0";
  primaryMaterColor: any;
  primartPaletteMater: any;
  secPaletteMater: any;

  // Custom palette generator
  primaryColor: string = "#3171e0";
  primaryColorPalette: Color[] = [];
  secondaryColor: string = "#3dc2ff";
  secondaryColorPalette: Color[] = [];
  backgroundColor: string = "#ebebeb";
  bodyFontColor: string = "#1f1f1f";
  accessibility: any;
  contrast: any;
  form: FormGroup;

  /* form = new FormGroup({
    gender: new FormControl('', Validators.required),
  }); */
  get f() {
    return this.form.controls;
  }

  buttonClass: string = "primary";

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
    floor: 4,
    ceil: 16,
    step: 2,
  };

  isFontsLoaded = false;

  selectedheaderFont: string = "Raleway";
  selectedBodyFont: string = "Roboto";
  headerFonts = [
    "Open Sans Condensed",
    "Oswald",
    "Montserrat",
    "Raleway",
    "Playfair Display",
    "Fjalla One",
    "Alegreya",
  ];
  bodyfonts = [
    "Open Sans",
    "EB Garamond",
    "Merriweather",
    "Roboto",
    "Source Sans Pro",
    "Roboto Slab",
    "Noto Sans",
    "Lato",
  ];
  constructor(fb: FormBuilder, private fontService: FontloaderService) {
    this.generateColorCombo();

    this.generatePrimaryPalette();
    this.generateSecondaryPalette();
    this.setBGandFontColor();
    // Check Color combo
    const sampleCombo = ColorCombos(["#006bb6", "#ffffff"], { compact: true });
    console.log(`sampleCombo, ${sampleCombo}`);
    console.log(sampleCombo);

    this.form = fb.group({
      variant: ["primary", Validators.required],
    });
    // Get the element with id="defaultOpen" and click on it
    // document.getElementById("defaultOpen").click();
    this.checkColorCombo();
  }
  ngAfterViewInit() {
    fromEvent(document.querySelectorAll(".accordion"), "click").subscribe(
      (event) => {
        const currentElm: HTMLButtonElement = event.target as HTMLButtonElement;
        currentElm.classList.toggle("active");
        var panel = currentElm.nextElementSibling as HTMLDivElement;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      }
    );

    // Get the element with id="defaultOpen" and click on it
    document.getElementById("defaultOpen").click();
  }
  setBGandFontColor() {
    document.documentElement.style.setProperty(
      "--theme-background-color",
      this.backgroundColor
    );
    document.documentElement.style.setProperty(
      "--theme-body-font-color",
      this.bodyFontColor
    );
    document.documentElement.style.setProperty(
      "--theme-border-radius",
      this.sliderValue + "px"
    );
    document.documentElement.style.setProperty(
      "--theme-spacing",
      this.sliderValueSpacing + "px"
    );
    document.documentElement.style.setProperty(
      "--theme-body-font",
      this.selectedBodyFont
    );
    document.documentElement.style.setProperty(
      "--theme-header-font",
      this.selectedheaderFont
    );
  }
  getStyleObj() {
    const cssText = document.documentElement.style.cssText;
    var cssTxt = cssText.replace(/\/\*(.|\s)*?\*\//g, " ").replace(/\s+/g, " ");
    var style = {},
      [, ruleName, rule] = cssTxt.match(/ ?(.*?) ?{([^}]*)}/) || [, , cssTxt];
    var cssToJs = (s) =>
      s.replace(/\W+\w/g, (match) => match.slice(-1).toUpperCase());
    var properties = rule
      .split(";")
      .map((o) => o.split(":").map((x) => x && x.trim()));
    for (var [property, value] of properties) style[property] = value;
    return style;
    // return { cssText, ruleName, style };
  }
  generateTokenObj() {
    let sampleObj = {};
    const newSampleObj = this.getStyleObj();
    sampleObj["custom-properties"] = newSampleObj;
    console.log(sampleObj);
    this.saveTokenObj(JSON.stringify(sampleObj), "config.json");
  }
  saveTokenObj(data, filename) {
    var a = document.createElement("a");
    a.setAttribute(
      "href",
      "data:text/plain;charset=utf-u," + encodeURIComponent(data)
    );
    a.setAttribute("download", filename);
    a.click();
  }
  generatePrimaryPalette() {
    this.primaryColorPalette = computeColors(this.primaryColor);
    for (const color of this.primaryColorPalette) {
      const key1 = `--theme-primary-${color.name}`;
      const value1 = color.hex;
      const key2 = `--theme-primary-contrast-${color.name}`;
      const value2 = color.darkContrast ? "rgba(black, 0.87)" : "white";
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
      const value2 = color.darkContrast ? "rgba(black, 0.87)" : "white";
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
    document.documentElement.style.setProperty(
      "--theme-border-radius",
      e + "px"
    );
  }
  sliderChangeSpacing(e) {
    document.documentElement.style.setProperty("--theme-spacing", e + "px");
  }
  generateColorCombo() {
    this.primaryPaletterArr = [];
    this.secPaletterArr = [];
    this.primaryMaterColor = new Matercolor(this.primaryColor, {
      threshold: 128,
      showContrastText: true,
    });
    this.primartPaletteMater = this.primaryMaterColor.palette.primary;
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
  checkColorCombo() {
    const sampleCombo = ColorCombos(
      [this.backgroundColor, this.bodyFontColor],
      { compact: true }
    );
    this.accessibility = sampleCombo[0].combinations[0].accessibility;
    this.contrast = sampleCombo[0].combinations[0].contrast;
    console.log(this.accessibility);
    console.log(this.contrast);
    console.log(sampleCombo);
  }
  backgroundColorChange(e) {
    document.documentElement.style.setProperty(
      "--theme-background-color",
      this.backgroundColor
    );
    this.checkColorCombo();
  }
  bodyFontColorChange(e) {
    document.documentElement.style.setProperty(
      "--theme-body-font-color",
      this.bodyFontColor
    );
    this.checkColorCombo();
  }
  setComboColor() {
    document.documentElement.style.setProperty(
      "--theme-body-font-color",
      this.bodyFontColor
    );
    document.documentElement.style.setProperty(
      "--theme-background-color",
      this.backgroundColor
    );
  }
  switchDarkMode(e) {
    var body = document.body;
    e.target.checked
      ? body.classList.add("darkMode")
      : body.classList.remove("darkMode");
  }
  onOptionsSelected() {
    console.log(this.selectedheaderFont);
    this.fontService.loadFont2(this.selectedheaderFont);
    document.documentElement.style.setProperty(
      "--theme-body-font",
      this.selectedheaderFont
    );
    // this.filtered = this.stat.filter((t) => t.value == this.selected);
  }
  setFont(type) {
    const fontProperty =
      type == "body" ? "--theme-body-font" : "--theme-header-font";
    const font =
      type == "body" ? this.selectedBodyFont : this.selectedheaderFont;
    this.fontService.loadFont2(font);
    document.documentElement.style.setProperty(fontProperty, font);
    // this.filtered = this.stat.filter((t) => t.value == this.selected);
  }
  openCity(elmnt, cityName) {
    elmnt = elmnt.target;
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].style.backgroundColor = "";
    }
    document.getElementById(cityName).style.display = "block";
    elmnt.style.backgroundColor = "#007bff";
  }
}

function computeColors(hex: string): Color[] {
  return [
    getColorObject(tinycolor(hex).lighten(52), "50"),
    getColorObject(tinycolor(hex).lighten(37), "100"),
    getColorObject(tinycolor(hex).lighten(26), "200"),
    getColorObject(tinycolor(hex).lighten(12), "300"),
    getColorObject(tinycolor(hex).lighten(6), "400"),
    getColorObject(tinycolor(hex), "500"),
    getColorObject(tinycolor(hex).darken(6), "600"),
    getColorObject(tinycolor(hex).darken(12), "700"),
    getColorObject(tinycolor(hex).darken(18), "800"),
    getColorObject(tinycolor(hex).darken(24), "900"),
    getColorObject(tinycolor(hex).lighten(50).saturate(30), "A100"),
    //  getColorObject(tinycolor(hex).lighten(30).saturate(30), "A200"),
    // getColorObject(tinycolor(hex).lighten(10).saturate(15), "A400"),
    getColorObject(tinycolor(hex).lighten(5).saturate(5), "A700"),
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
