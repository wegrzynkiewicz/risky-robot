import Vue from 'vue';

document.addEventListener('DOMContentLoaded', () => {

    const config = JSON.parse(document.getElementById('config').innerHTML);

    Vue.component('item', {
        computed: {
            source() {
                return `${this.name}.html`;
            },
        },
        props: ['name'],
        template: '#template-item',
    });

    const app = new Vue({
        data() {
            return {
                dataset: config.dataset,
            };
        },
        el: '#app',
        template: '#template-main',
    });

    window.vue = app;
});
