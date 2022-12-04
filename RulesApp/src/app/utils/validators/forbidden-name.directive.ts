import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";



export function forbiddenNameValidator(oldNames :string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = oldNames.includes(control.value) ;
    return forbidden ? {forbiddenName: {value: control.value}} : null;
  };
}
