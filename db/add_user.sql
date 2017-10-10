INSERT INTO users (uid, email, name)
VALUES ($1, $2, $3);
SELECT id FROM users
WHERE email = $2;
