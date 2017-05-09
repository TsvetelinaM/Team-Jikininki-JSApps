import Item from 'classItem';

class ProductItem extends Item {
    constructor(title, checked, quantity) {
        super(title, checked);
        this.quantity = quantity;
        this.isGrocery = true;
    }

    get quantity() {
        return this._quantity;
    }

    set quantity(value) {
        this._quantity = value;
    }
}

export { ProductItem as default }
