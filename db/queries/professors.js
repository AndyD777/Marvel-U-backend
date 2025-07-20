export async function getAllProfessors() {
  const { rows } = await db.query(`SELECT * FROM professors`);
  return rows;
}

export async function createProfessor({ name, email, date_of_hire, profile_image_url, department_id }) {
  const {
    rows: [prof],
  } = await db.query(
    `INSERT INTO professors (name, email, date_of_hire, profile_image_url, department_id)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *;`,
    [name, email, date_of_hire, profile_image_url, department_id]
  );
  return prof;
}