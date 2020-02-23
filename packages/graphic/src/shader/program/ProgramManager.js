export default class ProgramManager {

    constructor({view}) {
        this.view = view;
        this.programs = Object.create(null);
    }

    getProgramByName(name) {
        let program = this.programs[name];
        if (program === undefined) {
            throw new Error(`Program named (${name}) not found.`);
        }
        return program;
    }

    registerProgram(program) {
        this.programs[program.name] = program;
    }
}
