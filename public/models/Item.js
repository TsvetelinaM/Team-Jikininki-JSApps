class Item {
    constructor(title, description, checked) {
        this.title = title;
        this.description = description;
        this.checked = false;
    }

    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get checked() {
        return this._checked;
    }

    set checked(value) {
        this._checked = value;
    }
}

export { Item as default }