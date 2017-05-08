import Item from 'classItem';

class TaskItem extends Item {
    constructor(title, checked, dueDate) {
        super(title, checked);
        this.dueDate = dueDate;
    }

    get dueDate() {
        return this._dueDate;
    }

    set dueDate(value) {
        this._dueDate = value;
    }
}

export { TaskItem as default }