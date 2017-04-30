import 'jquery';
import toastr from 'toastr';
import ErrorDiv from 'classErrorDiv';

let validations = {
       allFieldsRequired (...items) {
         let errorMessage;
        if (items.some(item =>item.length<1)) {
            alert('All fields should be completed');
            errorMessage = new ErrorDiv('All fields should be completed');
            toastr.error('All fields should be completed');
            throw new Error('All fields should be completed');
          };
          return errorMessage;
      },

       passwordCheck(pass1, pass2) {
        let errorMessage;
        if (pass1 !== pass2) {
          alert('Passwords must match.');
          errorMessage = new ErrorDiv('Passwords must match.');
          toastr.error("Passwords must match.");
          throw new Error('All fields should be completed');
        }
        return errorMessage;
      },

      mailValidation(email) {
        let emailREG = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let validEMail = emailREG.test(email);
        let errorMessage;
       if (!validEMail) {
         alert('Not a valid email.');
         errorMessage = new ErrorDiv('Not a valid email.');
         toastr.error("Not a valid email.");
         throw new Error('All fields should be completed');
       }
        return errorMessage;
      }

};
export { validations as default };
