import * as templates from 'templates';
import Item from 'classItem';
import List from 'classList';
import elementSelector from 'elements';
import toastr from 'toastr';
import { setLocalStorage } from 'localStorage';
import database from 'database';
import $ from 'jquery';

let dashBEvents = {
    btnAddList: () => {
        $(elementSelector.addListButton).on('click', function () {
            let listTitle = $('#input-add-list').val();
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
    btnAddItem: (arg1) => {
        $("#btn-add-item").on("click", function () {
            let $inputAddItem = $("#input-add-item");
            let inputValue = $inputAddItem.val();
            if (inputValue !== null && inputValue !== "") {
                let newItem = new Item(inputValue, false, "", "");
                database.pushItem(arg1, newItem);
                location.reload(); // Fix this to load only template
            } else {
                toastr.error("Cannot add empty task to the list.");
            }
        });
    },
    checkboxTask: (arg1) => {
        $(".checkbox-task").on("click", function () {
            let key = $(this).attr("item-key-attribute");
            if ($(this).is(':checked')) {
                database.updateItemCheckState(arg1, key, true);
                location.reload(); // Fix this to load only template
            } else {
                database.updateItemCheckState(arg1, key, false);
                location.reload(); // Fix this to load only template
            }
        });
    },
    itemTrash: (arg1) => {
        $(".item-trash").on('click', function () {
            let key = $(this).prev().attr("item-key-attribute");
            database.removeItem(arg1, key);
            location.reload();
        });
    },
    saveItem: (arg1) => {
        $(".save-item").on('click', function () {
            console.log(event.target);
            let itemKey = $(event.target).prev().prev().attr("item-key-attribute");

            let newTitle = $("#edit-title").val();
            database.updateItem(arg1, itemKey, newTitle);

            location.reload(); // FIX
        });
    },
    editItem: (arg1) => {
        $(".edit-item").on('click', function (event) {
            templates.get('edit-item')
                .then(function (template) {
                    let key = $(event.target).prev().prev().attr("item-key-attribute");
                    database.getItem(arg1, key)
                        .then(function (item) {
                            let itemInfo = item.val();
                            // console.log(itemInfo);
                            $("#main-board").html(template(itemInfo));
                        })
                        .then(function () {
                            dashBEvents.saveItem(arg1);
                        });
                });
        });
    },
    listTitle: () => {
        $('.list-title').on('click', function (event) {
            event.preventDefault();
            $(".active").removeClass("active");
            $(this).addClass("active");
            let selectedListKey = $(".active > a > span").attr("data-atribute");

            database.getSingleList(selectedListKey)
                .then(function (list) {
                    let items = list.val()._items;
                    templates.get('user-list')
                        .then(function (template) {
                            let listObject = { title: list.val()._title, items: items };
                            $("#dashboard-welcome").addClass("hidden");
                            $("#main-board").html(template(listObject));
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