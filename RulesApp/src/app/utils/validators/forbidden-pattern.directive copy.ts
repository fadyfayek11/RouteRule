import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";



export function forbiddenPatternValidator(oldPatterns :string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = oldPatterns.includes(control.value) ;
    return forbidden ? {forbiddenPattern: {value: control.value}} : null;
  };
}
