class Category {
    constructor(title, icon) {
        this.title = title;
        this.icon = icon;
    }

    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    get icon() {
        return this._icon;
    }

    set icon(value) {
        this._icon = value;
    }
}

export { Category as default }