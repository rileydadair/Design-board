INSERT INTO boards (name, id)
VALUES ($1, $2);
SELECT * FROM boards
WHERE name = $1 AND id = $2;
