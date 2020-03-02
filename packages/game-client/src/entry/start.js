import App from '../App';

document.addEventListener('DOMContentLoaded', () => {
    const app = new App();

    window.emit = app.emit.bind(app);
    window.app = app;

    app.on('ready', async () => {
        await app.setCurrentStage('start');
        await app.setCurrentStage('loading');
        await app.setCurrentStage('game', {game_id: 1})
    });

    app.on('joinToGame', async function (event, element) {
        const game_id = element.dataset['game_id'];
        await app.setCurrentStage('loading');
        await app.setCurrentStage('game', {game_id})
    });

    app.initialize(document).then();
});
