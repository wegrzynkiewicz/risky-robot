document.addEventListener('DOMContentLoaded', () => {

    const config = JSON.parse(document.getElementById('config').innerHTML);

    Vue.component('item', {
        props: ['name'],
        template: '#template-item',
        computed: {
            source() {
                return `${this.name}.html`;
            },
        }
    });

    new Vue({
        el: '#app',
        template: '#template-main',
        data() {
            return {
                dataset: config.dataset,
            };
        }
    })
});
