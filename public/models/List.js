class List {
    constructor(title) {
        this.title = title;
        this.description = "No description";
        this.glyphicon = "glyphicon glyphicon-list-alt";
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

    get glyphicon() {
        return this._glyphicon;
    }

    set glyphicon(value) {
        this._glyphicon = value;
    }

    get items() {
        return this._items.slice();
    }

    addItem(item) {
        this._items.push(item);
    }
}

export {List as default }