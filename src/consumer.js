require('dotenv').config();

const amqp = require('amqplib');
const Listener = require('./Listener');
const MailSender = require('./MailSender');
const PlaylistSongsService = require('./service/PlaylistSongsService');
const config = require('./utils/config');

const init = async () => {
    const playlistSongsService = new PlaylistSongsService();
    const mailSender = new MailSender();
    const listener = new Listener(playlistSongsService, mailSender);

    const connection = await amqp.connect(config.rabbitMq.server);
    const channel = await connection.createChannel();

    await channel.assertQueue(config.rabbitMq.queue, {
        durable: true,
    });

    channel.consume('export:playlist', listener.listen, { noAck: true });
};

init();
