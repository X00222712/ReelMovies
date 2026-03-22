

INSERT INTO movies (title, rating, poster) VALUES
('The Shawshank Redemption', 'R', 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg'),
('The Godfather', 'R', 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg'),
('The Dark Knight', 'PG-13', 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg'),
('Pulp Fiction', 'R', 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg'),
('The Lord of the Rings: The Return of the King', 'PG-13', 'https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg'),
('Inception', 'PG-13', 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg'),
('Fight Club', 'R', 'https://image.tmdb.org/t/p/w500/bptfVGEQuv6vDTIMVCHjJ9Dz8PX.jpg'),
('Forrest Gump', 'PG-13', 'https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg'),
('The Matrix', 'R', 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg'),
('The Silence of the Lambs', 'R', 'https://image.tmdb.org/t/p/w500/rplLJ2hPcOQmkFhTqUte0MkEaO2.jpg'),
('My Neighbor Totoro', 'G', 'https://image.tmdb.org/t/p/w500/rtGDOeG9LzoerkDGZF9dnVeLppL.jpg'),
('Spirited Away', 'PG', 'https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg'),
('The Lion King', 'G', 'https://image.tmdb.org/t/p/w500/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg'),
('Toy Story', 'G', 'https://image.tmdb.org/t/p/w500/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg'),
('Finding Nemo', 'G', 'https://image.tmdb.org/t/p/w500/eHuGQ10FUzK1mdOY69wF5pGgEf5.jpg'),
('The Pokemon Movie: I Choose You!', 'PG', 'https://image.tmdb.org/t/p/w500/jNgGZBeqmdg9dU8qYhUqXHhE9tV.jpg'),
('Your Name', 'PG', 'https://image.tmdb.org/t/p/w500/q719jXXEzOoYaps6babgKnONONX.jpg'),
('Art of the Devil', 'R', 'https://image.tmdb.org/t/p/w500/uS9m8OBk1b6QGMzYHn3q2G9KJmK.jpg'),
('The Exorcist', 'R', 'https://image.tmdb.org/t/p/w500/4ucLGcXVVSVnsfkGtbLY4XAius8.jpg'),
('The Conjuring', 'R', 'https://image.tmdb.org/t/p/w500/wVYREutTvI2tmxr6ujrHT704wGF.jpg'),
('The Wolf of Wall Street', 'R', 'https://image.tmdb.org/t/p/w500/kW9LmvYHAaS9iA0tHmZVq8hQYoq.jpg'),
('Interstellar', 'PG-13', 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg'),
('The Batman', 'PG-13', 'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg'),
('Coco', 'PG', 'https://image.tmdb.org/t/p/w500/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg'),
('Avengers: Endgame', 'PG-13', 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg'),
('Black Panther', 'PG-13', 'https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg'),
('Guardians of the Galaxy', 'PG-13', 'https://image.tmdb.org/t/p/w500/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg');

INSERT INTO genres (name) VALUES
('Action'),
('Adventure'),
('Anime'),
('Animation'),
('Biography'),
('Comedy'),
('Crime'),
('Documentary'),
('Drama'),
('Family'),
('Fantasy'),
('Historical'),
('Horror'),
('Music'),
('Musical'),
('Mystery'),
('Parody'),
('Psychological'),
('Romance'),
('Satire'),
('Sci-Fi'),
('Sport'),
('Superhero'),
('Thriller'),
('War'),
('Western');

INSERT INTO movie_genres (movie_id, genre_id) VALUES
(1,9),
(2,9),
(3,1),(3,24),
(4,7),(4,9),
(5,2),(5,11),
(6,21),(6,24),
(7,9),(7,24),
(8,9),(8,19),
(9,21),(9,1),
(10,24),(10,7),
(11,4),(11,10),
(12,4),(12,11),
(13,4),(13,9),
(14,4),(14,10),
(15,4),(15,2),
(16,4),(16,2),
(17,4),(17,19),
(18,13),(18,24),
(19,13),(19,24),
(20,13),(20,24),
(21,9),(21,5),
(22,21),(22,2),
(23,1),(23,7),
(24,4),(24,10),
(25,1),(25,2),
(26,1),(26,2),
(27,1),(27,2);

-- DB setup for accounts
-- password : ITSupport
INSERT INTO user
    VALUES (1, 'IT Admin', 'itsuper@reelmovies.ie', 1, 1774013978005, 1774013978005);

INSERT INTO account (id, account_id, provider_id, user_id, password, created_at, updated_at)
    VALUES (1, 1, 'credential', 1, '4fc21a2f5840246c468d4bc03294eca7:c6489ce8b3d5320e648d9205e38f731ffc4cbe6130fcc8cb41ed93dd6ca756627333d1ee5db516012df23ac4586273945f1fc441a40cb474348d7981237b4480', 1774013978005, 1774013978005);

INSERT INTO admins VALUES (1, 1, 1);
INSERT INTO rewardpoints VALUES (1, 100000);

-- password : reelmovies
INSERT INTO user
    VALUES (2, 'Admin', 'admin@reelmovies.ie', 1, 1774013978005, 1774013978005);

INSERT INTO account (id, account_id, provider_id, user_id, password, created_at, updated_at)
    VALUES (2, 2, 'credential', 2, '91e4ec5c444f565c5b6244790e072617:be5568370d352ef92def713845e9d489556faa4dc6d1ef9c18df74222f22f53482e1d73b9e52f7541ff7f756b530bf5ebee2e312ae8f0d939abc56cffd6a7944', 1774013978005, 1774013978005);

INSERT INTO admins VALUES (2, 2, 0);
INSERT INTO rewardpoints VALUES (2, 0);

-- Password : password123
INSERT INTO user
    VALUES (3, 'Glen', 'test@test.ie', 0, 1774013978005, 1774013978005);

INSERT INTO account (id, account_id, provider_id, user_id, password, created_at, updated_at)
    VALUES (3, 3, 'credential', 3, '7c59045f52cff4247210fb1d0417461d:a342781a1eb22a78598c979008cfc8c04d1f6697dcf90ca8dabed3e91f84066189999d33225fd93cc8575370a4bdeeba1623e8cb81db416d24e6cb88b0e05ef8', 1774013978005, 1774013978005);

INSERT INTO rewardpoints VALUES (3, 200);

-- Password : SuperCool
INSERT INTO user
    VALUES (4, 'Alex', 'alex@test.ie', 0, 1774013978005, 1774013978005);

INSERT INTO account (id, account_id, provider_id, user_id, password, created_at, updated_at)
    VALUES (4, 4, 'credential', 4, 'd7d827ae5dd0b41356937e4d40d2c557:14717e34907753a3849cae8a5c5a2b05c689e84e2402159d42943e53e8167385c84a62770a8150c4d0674024e34d5fc0eb81fbd326288bafc9bad841f7c5beb4', 1774013978005, 1774013978005);

INSERT INTO rewardpoints VALUES (4, 400);
