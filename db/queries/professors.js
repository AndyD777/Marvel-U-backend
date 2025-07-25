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
  const sql = `
    SELECT professors.*, departments.department AS department_name
    FROM professors
    JOIN departments ON professors.department_id = departments.id
    WHERE professors.id = $1
  `;
  const {
    rows: [professor],
  } = await db.query(sql, [id]);
  return professor;
}

export async function updateProfessor(id, fields = {}) {
  const allowedFields = [
    "name",
    "email",
    "date_of_hire",
    "profile_image_url",
    "department_id",
  ];
  const updateFields = Object.keys(fields).filter((key) =>
    allowedFields.includes(key)
  );

  if (updateFields.length === 0) {
    return getProfessorById(id);
  }

  const setString = updateFields
    .map((key, index) => `"${key}" = $${index + 1}`)
    .join(", ");
  const updateValues = updateFields.map((key) => fields[key]);

  const {
    rows: [professor],
  } = await db.query(
    `UPDATE professors SET ${setString} WHERE id = $${
      updateValues.length + 1
    } RETURNING *`,
    [...updateValues, id]
  );
  return professor;
}

export async function deleteProfessor(id) {
  const {
    rows: [professor],
  } = await db.query("DELETE FROM professors WHERE id = $1 RETURNING *", [id]);
  return professor;
}
