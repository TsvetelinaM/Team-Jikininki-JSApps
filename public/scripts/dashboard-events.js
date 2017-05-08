import * as templates from 'templates';
import Item from 'classItem';
import TaskItem from 'classTaskItem';
import ProductItem from 'classProductItem';
import List from 'classList';
import elementSelector from 'elements';
import toastr from 'toastr';
import { setLocalStorage } from 'localStorage';
import database from 'database';
import $ from 'jquery';
import validator from 'validator';
import 'jqueryUI';

var dashBEvents = {
    loadListItems: (listKey, itemName) => {
        database.getSingleList(listKey)
            .then(function (list) {
                let items = list.val()._items;
                templates.get('user-list')
                    .then(function (template) {
                        let listObject = { title: list.val()._title, items: items };
                        $(elementSelector.dashboardMain).html(template(listObject));
                    })
                    .then(function () {
                        dashBEvents.btnAddItem(listKey);
                        dashBEvents.checkboxTask(listKey);
                        dashBEvents.itemTrash(listKey);
                        dashBEvents.editItem(listKey);

                    });
                toastr.success("New item " + itemName + " was added to list.");
            });
    },

    btnAddList: () => {
        $(elementSelector.addListButton).on('click', function () {
            try {
                let listTitle = $(elementSelector.addListInput).val();
                validator.isStringEmptyOrWhitespace(listTitle);

                let newList = new List(listTitle)
                database.pushList(newList);

                location.reload(); // FIX

                toastr.success("New list " + listTitle + " was added.");
            }
            catch (err) {
                toastr.error(err.name + ": " + err.message);
            }
        });
    },

    itemTrash: (listKey) => {
        $(elementSelector.itemTrashIcon).on('click', function (event) {
            try {
                let $itemElement = $(this).prev();
                validator.listItemHasKey($itemElement[0]);

                let itemKey = $(this).prev().attr("item-key-attribute");
                database
                    .removeItem(listKey, itemKey)
                    .then(function (success) {
                        const $target = $(event.target);
                        const $parent = $target.parent().parent();
                        $parent.remove();
                        toastr.options.positionClass = 'toast-top-center';
                        toastr.info("Task with ID: " + itemKey + " was removed.");
                    });
            }
            catch (err) {
                toastr.error(err.name + ": " + err.message);
            }
        });
    },

    checkboxTask: (listKey) => {
        $(elementSelector.itemCheckbox).on("click", function () {
            try {
                let $this = $(this);
                console.log($this);
                validator.listItemHasKey($this[0]);
                let itemKey = $this.attr("item-key-attribute");

                if ($this.is(':checked')) {
                    database.updateItemCheckState(listKey, itemKey, true);
                    database.removeDueDate(listKey, itemKey);
                    $this.prev().toggleClass('line-through');

                    toastr.options = {
                        "preventDuplicates": true
                    }
                    toastr.success("Task with ID: " + itemKey + " was marked as done.");
                } else {
                    database.updateItemCheckState(listKey, itemKey, false);
                    $this.prev().toggleClass('line-through');

                    toastr.options = {
                        "preventDuplicates": true
                    }
                    toastr.success("Task with ID: " + itemKey + " was unmarked as done.");
                }
            }
            catch (err) {
                toastr.error(err.name + ": " + err.message);
            }
        });
    },

    btnAddItem: (listKey) => {
        $(elementSelector.addItemButton).on("click", function () {
            try {
                const itemName = $(elementSelector.addItemInput).val();
                validator.isStringEmptyOrWhitespace(itemName);

                const newItem = new TaskItem(itemName, false, "");
                const newItemKey = database.pushItem(listKey, newItem).key;
                $(elementSelector.addItemInput).val("");

                dashBEvents.loadListItems(listKey, itemName);
            }
            catch (err) {
                console.log(err);
                toastr.error(err.name + ": " + err.message);
            }
        });
    },

    saveItem: (listKey, itemKey) => {
        $(elementSelector.itemSaveButton).on('click', function () {
            try {
                let newTitle = $(elementSelector.editTitleInput).val();
                validator.isStringEmptyOrWhitespace(newTitle);

                let newDate = $(elementSelector.editDateInput).val();
                validator.isEmptyOrWhitespace(newDate);

                database.updateItem(listKey, itemKey, newTitle, newDate);

                location.reload(); // FIX

                toastr.success("Task with ID: " + itemKey + " was saved.");
            }
            catch (err) {
                toastr.error(err.name + ": " + err.message);
            }
        });
    },

    editItem: (listKey) => {
        $(elementSelector.itemEditIcon).on('click', function (event) {
            templates.get('edit-item')
                .then(function (template) {
                    try {
                        let $item = $(event.target).prev().prev();
                        validator.listItemHasKey($item[0]);
                        let itemKey = $item.attr("item-key-attribute");

                        database.getItem(listKey, itemKey)
                            .then(function (item) {
                                let itemInfo = item.val();
                                $(elementSelector.dashboardMain).html(template(itemInfo));
                            })
                            .then(function () {
                                $("#datepicker").datepicker();
                                dashBEvents.saveItem(listKey, itemKey);
                            });
                    }
                    catch (err) {
                        toastr.error(err.name + ": " + err.message);
                    }
                });
        });
    },

    listTitle: () => {
        $(elementSelector.listTitle).on('click', function (event) {
            event.preventDefault();

            $(elementSelector.activelistElement).removeClass("active");
            $(this).addClass("active");
            let selectedListKey = $(".active > a > span").attr("data-atribute");

            database.getSingleList(selectedListKey)
                .then(function (list) {
                    let items = list.val()._items;
                    templates.get('user-list')
                        .then(function (template) {
                            let listObject = { title: list.val()._title, items: items };
                            $(elementSelector.dashboardWelcome).addClass("hidden");
                            $(elementSelector.dashboardMain).html(template(listObject));
                        })
                        .then(function () {
                            dashBEvents.btnAddItem(selectedListKey);
                            dashBEvents.checkboxTask(selectedListKey);
                            dashBEvents.itemTrash(selectedListKey);
                            dashBEvents.editItem(selectedListKey);
                        });
                });
        });
    }
};

export default dashBEvents;