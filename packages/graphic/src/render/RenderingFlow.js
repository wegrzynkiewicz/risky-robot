export default class RenderingFlow {

    constructor() {
        this.tasks = [];
        this.sortedTasks = [];
    }

    registerTask(task) {
        this.tasks.push(task);
        this.sortedTasks.push(task);
    }

    render(system, context) {
        const length = this.sortedTasks.length;
        for (let i = 0; i < length; i++) {
            const task = this.sortedTasks[i];
            task.render(system, context);
        }
    }
}
