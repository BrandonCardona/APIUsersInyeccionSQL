const QUERY = {
    SELECT_USERS: 'SELECT * FROM users WHERE name = ? and email=? and phone=?',
    SELECT_USER: 'SELECT * FROM users WHERE id = ?',
    CREATE_USER: 'INSERT INTO users(name, email, phone) VALUES (?, ?, ?)',
    UPDATE_USER: 'UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?',
    DELETE_USER: 'DELETE FROM users WHERE id = ?',
};

export default QUERY;

