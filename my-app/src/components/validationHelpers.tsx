
export function validateEmail(email: string)
{
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export function validatePassword(password: string)
{
  var re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/
  return re.test(password);
}

export function validateCpf(cpf: string){
  var re = /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/
  return re.test(cpf);
}

export function validateDate(dateStr: string)
{
  var currentTimestamp = new Date().getTime();
  try{
    var dateTimestamp = new Date(dateStr).getTime();
    return ((currentTimestamp - dateTimestamp) > 0)
  }
  catch(error){
    alert(error)
    return false;
  }


}
