import $ from 'jquery';

const database = {
    // Adding users methods
    createUser: function (email, password) {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    },

    pushData: function (user) {
        return firebase.database().ref('users').push(user);
    },
    signInUser: function (email, password) {
      return firebase.auth().signInWithEmailAndPassword(email, password);
    },

    // Getting information about the lists
    getLists: function () {
        return firebase.database().ref('lists/' + localStorage.uid).once('value');
    },
    getSingleList: function (key) {
        return firebase.database().ref('lists/' + localStorage.uid + '/' + key).once('value');
    },
    pushList: function (list) {
      return   firebase.database()
            .ref('lists/' + localStorage.uid)
            .push(list);

    },
    removeList: function (listKey) {
        return firebase.database()
            .ref('lists/' + localStorage.uid + '/' + listKey)
            .remove();
    },
    // Getting information about items
    getItem: function (listKey, itemKey) {
        return firebase.database()
            .ref('lists/' + localStorage.uid + '/' + listKey + '/_items/' + itemKey)
            .once('value');
    },
    pushItem: function (listKey, item) {
        return firebase.database()
            .ref('lists/' + localStorage.uid + '/' + listKey + '/_items')
            .push(item);
    },
    removeItem: function (listKey, itemKey) {
        return firebase.database()
            .ref('lists/' + localStorage.uid + '/' + listKey + '/_items/' + itemKey)
            .remove();
    },
    updateItemCheckState: function (listKey, itemKey, state) {
        return firebase.database()
            .ref('lists/' + localStorage.uid + '/' + listKey + '/_items/' + itemKey)
            .once('value', function (item) {
                item.ref.update({
                    "_checked": state
                });
            });
    },
    removeDueDate: function (listKey, itemKey) {
        return firebase.database()
            .ref('lists/' + localStorage.uid + '/' + listKey + '/_items/' + itemKey)
            .once('value', function (item) {
                item.ref.update({
                    "_dueDate": ""
                });
            });
    },
    updateItem: function (listKey, itemKey, title, dueDate) {
        return firebase.database()
            .ref('lists/' + localStorage.uid + '/' + listKey + '/_items/' + itemKey)
            .once('value', function (item) {
                item.ref.update({
                    "_title": title,
                    "_dueDate": dueDate
                });
            });
    },
    updateProdItem: function (listKey, itemKey, title, quantity) {
        return firebase.database()
            .ref('lists/' + localStorage.uid + '/' + listKey + '/_items/' + itemKey)
            .once('value', function (item) {
                item.ref.update({
                    "_title": title,
                    "_quantity": quantity
                });
            });
    }
};

export default database;
