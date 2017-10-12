SELECT DISTINCT on(board_id) b.board_id, b.name, i.image_url, i.site_url
FROM boards b
JOIN users u ON u.id = b.id
LEFT JOIN images i ON b.board_id = i.board_id
WHERE u.id = $1;
