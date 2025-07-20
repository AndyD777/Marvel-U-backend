export async function getUserById(id) {
  const {
    rows: [user],
  } = await db.query("SELECT * FROM users WHERE id = $1", [id]);
  return user;
}

export async function getUserByEmail(email) {
  const {
    rows: [user],
  } = await db.query("SELECT * FROM users WHERE email = $1", [email]);
  return user;
}

export async function createUser(email, hashedPassword) {
  const {
    rows: [user],
  } = await db.query(
    `INSERT INTO users (email, password)
     VALUES ($1, $2)
     RETURNING id, email;`,
    [email, hashedPassword]
  );
  return user;
}