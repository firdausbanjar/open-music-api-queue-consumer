const config = {
    nodemailer: {
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        username: process.env.MAIL_ADDRESS,
        password: process.env.MAIL_PASSWORD,
    },
    rabbitMq: {
        server: process.env.RABBITMQ_SERVER,
    },
};

module.exports = config;
