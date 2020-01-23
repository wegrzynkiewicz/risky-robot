import * as Frontend from "robo24-frontend";

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    const system = Frontend.createBasicSystem({window, canvas});
});
