class Item {
    constructor(title, checked) {
        this.title = title;
        this.checked = false;
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
}

export { Item as default }