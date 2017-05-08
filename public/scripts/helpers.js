import $ from 'jquery';

const helpers = {
    loadingScreen: function () {
        window.loading_screen = window.pleaseWait({
            logo: './css/logo.png',
            backgroundColor: '#5f9ea0',
            loadingHtml: '<div class="spinner"></div>'
        });
        return window.loading_screen;
    }
};

export default helpers;