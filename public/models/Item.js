class Item {
    constructor(title, checked, dateFrom, dateTo) {
        this.title = title;
        this.checked = false;
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
    }

    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    get checked() {
        return this._checked;
    }

    set checked(value) {
        this._checked = value;
    }

    get dateFrom() {
        return this._dateFrom;
    }

    set dateFrom(value) {
        this._dateFrom = value;
    }

    get dateTo() {
        return this._dateTo;
    }

    set dateTo(value) {
        this._dateTo = value;
    }
}

export { Item as default }