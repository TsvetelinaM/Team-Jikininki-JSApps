const elementSelector = {
    // SINGLE ID ELEMENT
    // dashboard
    dashboardWelcome: "#dashboard-welcome",
    dashboardMain: "#main-board",

    // list
    addListButton : "#btn-add-list",
    addListInput : "#input-add-list",
    editTitleInput : "#edit-title",
    editDateInput : "#datepicker",
    editQuantInput : "#quantitypicker",
    removeListButton: "#remove-list",

    // items
    addItemButton : "#btn-add-item",
    addItemInput : "#input-add-item",
    itemSaveButton : ".save-item", // TODO - refactor to ID

    // login/signup forms
    userNameInput : "#username",
    fullNameInput : "#fullname",
    passwordInput : "#password",
    confirmPassword : "#confirmPassword",
    emailInput : "#email",
    loginButton : "#btn-login",
    fbLoginButton : "#fb-login",
    signupButton : "#btn-signup",


    // CLASS ELEMENTS
    // list
    listTitle: ".list-title",
    activelistElement: ".active",

    // items
    itemCheckbox : ".checkbox-task",
    itemEditIcon : ".edit-item",
    itemTrashIcon : ".item-trash"
}

export default elementSelector;
