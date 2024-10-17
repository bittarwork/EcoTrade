
(async () => {
    const chalk = (await import('chalk')).default;
    const express = require('express');
    const cors = require('cors');
    require('./scheduled/cronJobs');
    const userRoutes = require('./routes/userRoutes');
    const requestRoutes = require('./routes/requestRoutes');
    const messageRoutes = require('./routes/messageRoutes');
    const auctionRoutes = require('./routes/auctionRoutes');
    const dotenv = require('dotenv');
    const connectDB = require('./config/db.config');
    const path = require('path');
    dotenv.config();

    const app = express();
    const PORT = process.env.PORT || 5000;

    app.use(cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
    }));

    app.use(express.json());
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

    connectDB();

    // app.use((req, res, next) => {
    //     const start = Date.now();

    //     const originalSend = res.send;
    //     res.send = function (body) {
    //         const responseTime = Date.now() - start;

    //         console.log(chalk.bgBlue.bold(`\n===== New Request =====`));
    //         console.log(chalk.blue(`URL: `) + chalk.cyan(`${req.method} ${req.originalUrl}`));
    //         console.log(chalk.blue(`Headers: `) + chalk.gray(JSON.stringify(req.headers).slice(0, 50) + '...'));
    //         console.log(chalk.blue(`Body: `) + chalk.gray(JSON.stringify(req.body).slice(0, 50) + '...'));
    //         console.log(chalk.yellow.bold(`--- Response ---`));
    //         console.log(chalk.yellow(`Status: `) + chalk.green.bold(res.statusCode));
    //         console.log(chalk.yellow(`Response Time: `) + chalk.green(`${responseTime} ms`));
    //         console.log(chalk.yellow(`Body: `) + chalk.gray(typeof body === 'string' ? body.slice(0, 50) + '...' : ''));
    //         console.log(chalk.bgBlue.bold(`=========================\n`));

    //         originalSend.apply(res, arguments);
    //     };

    //     next();
    // });

    app.use('/api/users', userRoutes);
    app.use('/api/requests', requestRoutes);
    app.use('/api/messages', messageRoutes);
    app.use('/api/auction', auctionRoutes);

    app.listen(PORT, () => {
        console.log(chalk.green(`Server is running on http://localhost:${PORT}`));
    });
})();
