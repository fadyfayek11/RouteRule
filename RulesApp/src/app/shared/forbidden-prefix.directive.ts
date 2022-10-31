import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export function forbiddenPrefixValidator(oldPrefix :string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = oldPrefix.includes(control.value) ;
    return forbidden ? {forbiddenPrefix: {value: control.value}} : null;
  };
}
