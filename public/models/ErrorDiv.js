// to be removed
class ErrorDiv {
  constructor(text) {
      this.div = $('<div />');
      this.div.html(text);
      $('body').html(this.div);
    };
}

export { ErrorDiv as default };
