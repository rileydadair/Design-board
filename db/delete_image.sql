DELETE FROM images
WHERE image_url = $1;
SELECT * FROM images
WHERE board_id = $2;
