import express from "express";
import requireUser from "../middleware/requireUser.js";
import requireBody from "../middleware/requireBody.js";

import {
  getAllDepartments,
  getDepartmentById,
  getProfessorsByDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../db/queries/departments.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const departments = await getAllDepartments();
    res.send(departments);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const department = await getDepartmentById(req.params.id);
    if (!department) {
      return res.status(404).send("Department not found.");
    }
    res.send(department);
  } catch (error) {
    next(error);
  }
});

router.get("/:id/professors", async (req, res, next) => {
  try {
    const department = await getDepartmentById(req.params.id);
    if (!department) {
      return res.status(404).send("Department not found.");
    }
    const professors = await getProfessorsByDepartment(req.params.id);
    res.send(professors);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  requireUser,
  requireBody(["department", "description", "banner_image_url"]),
  async (req, res, next) => {
    try {
      const newDepartment = await createDepartment(req.body);
      res.status(201).send(newDepartment);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  requireUser,
  requireBody(["department", "description", "banner_image_url"]),
  async (req, res, next) => {
    try {
      const updatedDepartment = await updateDepartment(req.params.id, req.body);
      if (!updatedDepartment) {
        return res.status(404).send("Department not found.");
      }
      res.send(updatedDepartment);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", requireUser, async (req, res, next) => {
  try {
    const deletedDepartment = await deleteDepartment(req.params.id);
    if (!deletedDepartment) {
      return res.status(404).send("Department not found.");
    }
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

export default router;
