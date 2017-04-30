import Item from 'classItem';

class TaskItem extends Item {
    constructor(title, description, checked, reminderDate) {
        super(title, description, checked);
        this.reminderDate = reminderDate;
    }

    get reminderDate() {
        return this._reminderDate;
    }

    set reminderDate(value) {
        this._reminderDate = value;
    }
}

export { TaskItem as default }