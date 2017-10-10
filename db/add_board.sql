INSERT INTO boards (name, id)
VALUES ($1, $2);
-- Return new board_id
SELECT * FROM boards
WHERE name = $1 AND id = $2;
