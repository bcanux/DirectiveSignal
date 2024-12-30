import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]',
  //standalone: false,
})
export class CustomLabelDirective implements OnInit {

  private htmlElement?:  ElementRef<HTMLElement>;
  private _color: string = 'red';
  private _errors?:  ValidationErrors|null|undefined;



  @Input() set color(value: string){
    this._color = value;
    this.setStyle();
  }

  @Input() set errors(value: ValidationErrors|null |undefined){
    this._errors = value;
    //console.log(value);
    this.setErrorMessage();
  }


  constructor( private el: ElementRef<HTMLElement>){
    //console.log('Constructor de la directiva');
    //console.log(el);
    this.htmlElement = el;


  }

  ngOnInit(): void {
    //console.log('Directiva NgOnInit');
    this.setStyle();
  }

  setStyle(): void{
    if (!this.htmlElement) return;

    this.htmlElement.nativeElement.style.color = this._color;
  }

  setErrorMessage(): void{
    if(!this.htmlElement) return;
    if( !this._errors){
      this.htmlElement.nativeElement.innerText = 'No hay errores';
    }

    const errors = this._errors? Object.keys(this._errors): [];

    if (errors.includes('required')){
      this.htmlElement.nativeElement.innerText = 'Este campo es requerido';
      return;
    }
    if (errors.includes('minlength')){
      const min = this._errors!['minlength']['requiredLength'];
      const current = this._errors!['minlength']['actualLength'];
      this.htmlElement.nativeElement.innerText = `Mínimo ${current}/${min} caracteres.`
      return;
    }
    if (errors.includes('email')){
      this.htmlElement.nativeElement.innerText = 'Debe ingresar un correo electrónico válido.';
      return;
    }

  }
}
