export default class ProgramManager {

    constructor({view}) {
        this.view = view;
        this.programsMap = new Map();
    }

    getProgramByName(name) {
        if (!this.programsMap.has(name)) {
            throw new Error(`Program named (${name}) not found.`);
        }
        return this.programsMap.get(name);
    }

    registerProgram(program) {
        this.programsMap.set(program.name, program);
    }
}
