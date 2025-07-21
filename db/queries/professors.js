import db from "../client.js";

export async function getAllProfessors() {
  const { rows } = await db.query(`SELECT * FROM professors`);
  return rows;
}

export async function createProfessor({
  name,
  email,
  date_of_hire,
  profile_image_url,
  department_id,
}) {
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

export async function getProfessorById(id) {
  const {
    rows: [professor],
  } = await db.query("SELECT * FROM professors WHERE id = $1", [id]);
  return professor;
}

export async function updateProfessor(id, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}" = $${index + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return getProfessorById(id);
  }

  const {
    rows: [professor],
  } = await db.query(
    `UPDATE professors SET ${setString} WHERE id = $${
      Object.keys(fields).length + 1
    } RETURNING *`,
    [...Object.values(fields), id]
  );
  return professor;
}

export async function deleteProfessor(id) {
  const {
    rows: [professor],
  } = await db.query("DELETE FROM professors WHERE id = $1 RETURNING *", [id]);
  return professor;
}
