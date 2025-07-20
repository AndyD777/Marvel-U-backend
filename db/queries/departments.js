import db from "#db/client.js";

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
