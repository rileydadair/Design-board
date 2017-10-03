INSERT INTO users (email, password, name, username)
VALUES ($1, $2, $3, $4);
SELECT * FROM users;
