const path = require('path');
const userRoutes = require("../routes/user.route");
const matchRoutes = require("../routes/match.route");
const recommendationRoutes = require("../routes/recommendation.route");
const chatRoutes = require("../routes/chat.route");
const noteRoutes = require("../routes/note.route");
const taskRoutes = require("../routes/task.route");
const trashRoutes = require("../routes/trash.route");

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.send({
            message: 'OK - Server is up and running',
            code: 200,
            version: '1.0.0'
        })
    });
    app.get('/faliare', (req, res) => {
        return res.sendFile(path.join(__dirname, '..', 'public', 'faliare.html'));
    });

    app.use('/user', userRoutes);
    app.use('/match', matchRoutes);
    app.use('/recommendation', recommendationRoutes);
    app.use('/chat', chatRoutes);
    app.use('/note', noteRoutes);
    app.use('/task', taskRoutes);
    app.use('/trash', trashRoutes);

};