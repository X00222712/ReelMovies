import Database from "better-sqlite3";

const db = new Database("movies.db");

export default db;

db.exec(`

CREATE TABLE IF NOT EXISTS movies (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  rating TEXT,
  poster TEXT
);

CREATE TABLE IF NOT EXISTS genres (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT
);

CREATE TABLE IF NOT EXISTS movie_genres (
  movie_id INTEGER,
  genre_id INTEGER
);

`);

export default db;

const genres = [
    "Action",
    "Adventure",
    "Anime",
    "Animation",
    "Biography",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "Historical",
    "Horror",
    "Music",
    "Musical",
    "Mystery",
    "Parody",
    "Psychological",
    "Romance",
    "Satire",
    "Sci-Fi",
    "Sport",
    "Superhero",
    "Thriller",
    "War",
    "Western",
];

const insertGenre = db.prepare("INSERT INTO genres (name) VALUES (?)");

for (const g of genres) {
insertGenre.run(g);
}

const insertMovie = db.prepare(`
INSERT INTO movies (title, rating, poster)
VALUES (?, ?, ?)
`);

const movies = [
    ["The Shawshank Redemption", "R", "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYjM3NmEwXkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_.jpg"],
    ["The Godfather", "R", "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00ZjQzLWFmNTEtODM1ZmRlYjM3NmEwXkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_.jpg"],
    ["The Dark Knight", "PG-13", "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODI3NF5BMl5BanBnXkFtZTYwODc4NDI3._V1_.jpg"],
    ["Pulp Fiction", "R", "https://m.media-amazon.com/images/M/MV5BNGQxNDgzODQtYjA4Ni00ZDE3LWFmNTEtODM1ZmRlYjM3NmEwXkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_.jpg"],
    ["The Lord of the Rings: The Return of the King", "PG-13", "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzctYzA1Ni00MTY3LWFmNTEtODM1ZmRlYjM3NmEwXkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_.jpg"],
    ["Inception", "PG-13", "https://m.media-amazon.com/images/M/MV5BMjAxMzY3Njc0NV5BMl5BanBnXkFtZTYwODc4NDI3._V1_.jpg"],
    ["Fight Club", "R", "https://m.media-amazon.com/images/M/MV5BMmEzYjA4ODQtYjA4Ni00ZDE3LWFmNTEtODM1ZmRlYjM3NmEwXkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_.jpg"],
    ["Forrest Gump", "PG-13", "https://m.media-amazon.com/images/M/MV5BNWIwODc2MGEtYjA4Ni00ZDE3LWFmNTEtODM1ZmRlYjM3NmEwXkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_.jpg"],
    ["The Matrix", "R", "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtYjA4Ni00ZDE3LWFmNTEtODM1ZmRlYjM3NmEwXkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_.jpg"],
    ["The Silence of the Lambs", "R", "https://m.media-amazon.com/images/M/MV5BNGQxNDgzODQtYjA4Ni00ZDE3LWFmNTEtODM1ZmRlYjM3NmEwXkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_.jpg"],
    ["My Neighbor Totoro", "G", "https://m.media-amazon.com/images/M/MV5BMjA4ODQ3ODk0NV5BMl5BanBnXkFtZTYwODc4NDI3._V1_.jpg"],
    ["Spirited Away", "PG", "https://m.media-amazon.com/images/M/MV5BMjA4ODQ3ODk0NV5BMl5BanBnXkFtZTYwODc4NDI3._V1_.jpg"],
    ["The Lion King", "G", "https://m.media-amazon.com/images/M/MV5BMjA4ODQ3ODk0NV5BMl5BanBnXkFtZTYwODc4NDI3._V1_.jpg"],
    ["Toy Story", "G", "https://m.media-amazon.com/images/M/MV5BMjA4ODQ3ODk0NV5BMl5BanBnXkFtZTYwODc4NDI3._V1_.jpg"],
    ["Finding Nemo", "G", "https://m.media-amazon.com/images/M/MV5BMjA4ODQ3ODk0NV5BMl5BanBnXkFtZTYwODc4NDI3._V1_.jpg"],
    ["The Pokemon Movie: I Choose You!", "PG", "https://m.media-amazon.com/images/M/MV5BMjA4ODQ3ODk0NV5BMl5BanBnXkFtZTYwODc4NDI3._V1_.jpg"],
    ["Your Name", "PG", "https://m.media-amazon.com/images/M/MV5BMjA4ODQ3ODk0NV5BMl5BanBnXkFtZTYwODc4NDI3._V1_.jpg"],
    ["Art of the Devil", "R", "https://m.media-amazon.com/images/M/MV5BMjA4ODQ3ODk0NV5BMl5BanBnXkFtZTYwODc4NDI3._V1_.jpg"],
    ["The Exorcist", "R", "https://m.media-amazon.com/images/M/MV5BMjA4ODQ3ODk0NV5BMl5BanBnXkFtZTYwODc4NDI3._V1_.jpg"],
    ["The Conjuring", "R", "https://m.media-amazon.com/images/M/MV5BMjA4ODQ3ODk0NV5BMl5BanBnXkFtZTYwODc4NDI3._V1_.jpg"],
    ["The Wolf of Wall Street", "R", "https://m.media-amazon.com/images/M/MV5BMjA4ODQ3ODk0NV5BMl5BanBnXkFtZTYwODc4NDI3._V1_.jpg"],
    ["Interstellar", "PG-13", "https://m.media-amazon.com/images/M/MV5BMjA4ODQ3ODk0NV5BMl5BanBnXkFtZTYwODc4NDI3._V1_.jpg"],
    ["The Batman", "PG-13", "https://m.media-amazon.com/images/M/MV5BMjA4ODQ3ODk0NV5BMl5BanBnXkFtZTYwODc4NDI3._V1_.jpg"],
    ["Coco", "PG", "https://m.media-amazon.com/images/M/MV5BMjA4ODQ3ODk0NV5BMl5BanBnXkFtZTYwODc4NDI3._V1_.jpg"],
    ["Avengers: Endgame", "PG-13", "https://m.media-amazon.com/images/M/MV5BMjA4ODQ3ODk0NV5BMl5BanBnXkFtZTYwODc4NDI3._V1_.jpg"],
    ["Black Panther", "PG-13", "https://m.media-amazon.com/images/M/MV5BMjA4ODQ3ODk0NV5BMl5BanBnXkFtZTYwODc4NDI3._V1_.jpg"],
    ["Guardians of the Galaxy", "PG-13", "https://m.media-amazon.com/images/M/MV5BMjA4ODQ3ODk0NV5BMl5BanBnXkFtZTYwODc4NDI3._V1_.jpg"],
];

const insertMovie = db.prepare(`
INSERT INTO movies (title, rating, poster)
VALUES (?, ?, ?)
`);

insertMovie.run(
"Interstellar",
"PG-13",
"https://via.placeholder.com/300x450"
);

const movieGenres = [
    [1, 9],  // The Shawshank Redemption - Drama
    [2, 9],  // The Godfather - Drama
    [3, 1], [3, 24], // The Dark Knight - Action, Thriller
    [4, 7], [4, 9],  // Pulp Fiction - Crime, Drama
    [5, 2], [5, 11], // The Lord of the Rings: The Return of the King - Adventure, Fantasy
    [6, 21], [6, 24],// Inception - Sci-Fi, Thriller
    [7, 9], [7, 24], // Fight Club - Drama, Thriller
    [8, 9], [8, 19], // Forrest Gump - Drama, Romance
    [9, 21], [9, 1], // The Matrix - Sci-Fi, Action
    [10, 24], [10, 7],// The Silence of the Lambs - Thriller, Crime
    [11, 4], [11, 10],// My Neighbor Totoro - Animation, Family
    [12, 4], [12, 11],// Spirited Away - Animation, Fantasy
    [13, 4], [13, 9], // The Lion King - Animation, Drama
    [14, 4], [14, 10],// Toy Story - Animation, Family
    [15, 4], [15, 2], // Finding Nemo - Animation, Adventure
    [16, 4], [16, 2], // The Pokemon Movie: I Choose You! - Animation, Adventure
    [17, 4], [17, 19],// Your Name - Animation, Romance
    [18, 13], [18, 24],// Art of the Devil - Horror, Thriller
    [19, 13], [19, 24],// The Exorcist - Horror, Thriller
    [20, 13], [20, 24],// The Conjuring - Horror, Thriller
    [21, 9], [21, 5], // The Wolf of Wall Street - Drama, Biography
    [22, 21], [22, 2],// Interstellar - Sci-Fi, Adventure
    [23, 1], [23, 7], // The Batman - Action, Crime
    [24, 4], [24, 10],// Coco - Animation, Family
    [25, 1], [25, 2], // Avengers: Endgame - Action, Adventure
    [26, 1], [26, 2], // Black Panther - Action, Adventure
    [27, 1], [27, 2], // Guardians of the Galaxy - Action, Adventure
];

for (const mg of movieGenres) {
link.run(mg[0], mg[1]);
}

export default db;