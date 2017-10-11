INSERT INTO images (site_url, board_id)
VALUES ($1, $2);
SELECT * FROM images
WHERE board_id = $2;
