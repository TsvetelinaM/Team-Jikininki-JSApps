class List {
    constructor(title, description, category) {
        this.title = title;
        this.description = description;
        this.category = category;
        this._items = [];
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

    get category() {
        return this._category;
    }

    set category(value) {
        this._category = value;
    }

    get items() {
        return this._items.slice();
    }

    addItem(item) {
        this._items.push(item);
    }
}

export {List as default }