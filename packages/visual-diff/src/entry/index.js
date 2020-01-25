const dataset = process.env.DATASET;

document.addEventListener('DOMContentLoaded', () => {

    Vue.component("item", {
        props: ["name"],
        template: "#template-item",
        computed: {
            source() {
                return `${this.name}.html`;
            },
        }
    });

    new Vue({
        el: "#app",
        template: "#template-main",
        data() {
            return {
                dataset: dataset,
            };
        }
    })
});
