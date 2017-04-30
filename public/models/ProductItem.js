import Item from 'classItem';

class ProductItem extends Item {
    constructor(title, description, checked, quantity) {
        super(title, description, checked);
        this.quantity = quantity;
    }

    get quantity() {
        return this._quantity;
    }

    set quantity(value) {
        this._quantity = value;
    }
}

export { ProductItem as default }