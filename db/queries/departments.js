import db from "../client.js";

export async function getAllDepartments() {
  const { rows } = await db.query(`SELECT * FROM departments`);
  return rows;
}

export async function createDepartment(department) {
  const {
    rows: [dept],
  } = await db.query(
    `INSERT INTO departments (department)
     VALUES ($1)
     RETURNING *;`,
    [department]
  );
  return dept;
}

export async function getDepartmentById(id) {
  const {
    rows: [department],
  } = await db.query("SELECT * FROM departments WHERE id = $1", [id]);
  return department;
}

export async function getProfessorsByDepartment(departmentId) {
  const { rows } = await db.query(
    "SELECT * FROM professors WHERE department_id = $1",
    [departmentId]
  );
  return rows;
}

export async function updateDepartment(id, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}" = $${index + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return getDepartmentById(id);
  }

  const {
    rows: [department],
  } = await db.query(
    `UPDATE departments SET ${setString} WHERE id = $${
      Object.keys(fields).length + 1
    } RETURNING *`,
    [...Object.values(fields), id]
  );
  return department;
}

export async function deleteDepartment(id) {
  const {
    rows: [department],
  } = await db.query("DELETE FROM departments WHERE id = $1 RETURNING *", [id]);
  return department;
}
