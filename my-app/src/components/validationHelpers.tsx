import { REGEX_CPF, REGEX_EMAIL, REGEX_PASSWORD } from "../constants";

export function validateEmail(email: string)
{
  return REGEX_EMAIL.test(email);
}

export function validatePassword(password: string)
{
  return REGEX_PASSWORD.test(password);
}

export function validateCpf(cpf: string){
  return REGEX_CPF.test(cpf);
}

export function validateDate(dateStr: string)
{
  var currentTimestamp = new Date().getTime();
  var dateTimestamp = new Date(dateStr).getTime();
  return ((currentTimestamp - dateTimestamp) > 0)

}
