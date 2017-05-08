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

let dashBEvents = {
    btnAddList: () => {
        $(elementSelector.addListButton).on('click', function () {
            let listTitle = $(elementSelector.addListInput).val();
            
            if (listTitle == "") {
                toastr.error("Cannot add list without a title.");
            } else {
                let newList = new List(listTitle)
                database.pushList(newList);
                location.reload();
                toastr.success("New list " + listTitle + " was added.");
            }
        });
    },

    btnAddItem: (listKey) => {
        $(elementSelector.addItemButton).on("click", function () {
            let inputValue = $(elementSelector.addItemInput).val();
            
            if (inputValue !== null && inputValue !== "") {
                let newItem = new TaskItem(inputValue, false, "");
                database.pushItem(listKey, newItem);
                location.reload(); // Fix this to load only template
            } else {
                toastr.error("Cannot add empty task to the list.");
            }
        });
    },

    checkboxTask: (listKey) => {
        $(elementSelector.itemCheckbox).on("click", function () {
            let key = $(this).attr("item-key-attribute");
            
            if ($(this).is(':checked')) {
                database.updateItemCheckState(listKey, key, true);
                database.removeDueDate(listKey, key);
            } else {
                database.updateItemCheckState(listKey, key, false);
            }
            location.reload(); // Fix this to load only template
        });
    },

    itemTrash: (listKey) => {
        $(elementSelector.itemTrashIcon).on('click', function () {
            let key = $(this).prev().attr("item-key-attribute");
            database.removeItem(listKey, key);
            location.reload();
        });
    },

    saveItem: (listKey, itemKey) => {
        $(elementSelector.itemSaveButton).on('click', function () {
            let newTitle = $(elementSelector.editTitleInput).val();
            let newDate = $(elementSelector.editDateInput).val();
            database.updateItem(listKey, itemKey, newTitle, newDate);

            location.reload(); // FIX
        });
    },

    editItem: (listKey) => {
        $(elementSelector.itemEditIcon).on('click', function (event) {
            templates.get('edit-item')
                .then(function (template) {
                    let key = $(event.target).prev().prev().attr("item-key-attribute");
                    database.getItem(listKey, key)
                        .then(function (item) {
                            let itemInfo = item.val();
                            $(elementSelector.dashboardMain).html(template(itemInfo));
                        })
                        .then(function () {
                            dashBEvents.saveItem(listKey, key);
                        });
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