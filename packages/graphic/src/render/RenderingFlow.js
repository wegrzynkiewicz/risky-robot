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
        context.renderingFlow = this;
        for (const task of this.sortedTasks) {
            task.render(system, context);
        }
    }
}
