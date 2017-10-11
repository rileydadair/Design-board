DELETE FROM images
WHERE image_id = $1;
SELECT * FROM images
WHERE board_id = $2;
