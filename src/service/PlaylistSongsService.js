const { Pool } = require('pg');

class PlaylistSongsService {
    constructor() {
        this._pool = new Pool();
    }

    async getPlaylistSongsByPlaylistId(playlistId) {
        const query = {
            text: `SELECT playlists.id, playlists.name, songs.id as song_id, songs.title as song_title, songs.performer
            FROM playlists
            LEFT JOIN playlist_songs ON playlist_songs.playlist_id = playlists.id
            LEFT JOIN songs ON songs.id = playlist_songs.song_id
            WHERE playlists.id = $1`,
            values: [playlistId],
        };

        const result = await this._pool.query(query);

        const songs = result.rows.map((song) => ({
            id: song.song_id,
            title: song.song_title,
            performer: song.performer,
        }));

        return {
            id: result.rows[0].id,
            name: result.rows[0].name,
            songs,
        };
    }
}

module.exports = PlaylistSongsService;
