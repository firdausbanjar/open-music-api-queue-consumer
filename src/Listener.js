class Listener {
    constructor(playlistSongsService, mailSender) {
        this._playlistSongsService = playlistSongsService;
        this._mailSender = mailSender;

        this.listen = this.listen.bind(this);
    }

    async listen(message) {
        try {
            const { playlistId, targetEmail } = JSON.parse(message.content.toString());

            console.log(playlistId);

            const playlist = await this._playlistSongsService.getPlaylistSongsByPlaylistId(
                playlistId
            );
            const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(playlist));
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = Listener;
