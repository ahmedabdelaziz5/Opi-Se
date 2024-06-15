var cron = require('node-cron');
const userRepo = require('../models/user/user.repo');
const month = 30 * 24 * 60 * 60 * 1000;

exports.deleteInActiveAccounts = () => {
    cron.schedule('0 0 */1 * *', async () => {
        await userRepo.deleteManyUsers(
            {
                joinedAt: { $gte: new Date(Date.now() - month) },
                isVerified: false
            }
        );
    });
};