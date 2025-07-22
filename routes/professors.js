import express from "express";
import requireUser from "../middleware/requireUser.js";
import requireBody from "../middleware/requireBody.js";

import {
  getAllProfessors,
  getProfessorById,
  createProfessor,
  updateProfessor,
  deleteProfessor,
} from "../db/queries/professors.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const professors = await getAllProfessors();
    res.send(professors);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const professor = await getProfessorById(req.params.id);
    if (!professor) {
      return res.status(404).send("Professor not found.");
    }
    res.send(professor);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  requireUser,
  requireBody(["name", "email", "date_of_hire", "department_id"]),
  async (req, res, next) => {
    try {
      const newProfessor = await createProfessor(req.body);
      res.status(201).send(newProfessor);
    } catch (error) {
      next(error);
    }
  }
);

router.put("/:id", requireUser, async (req, res, next) => {
  try {
    const updatedProfessor = await updateProfessor(req.params.id, req.body);
    if (!updatedProfessor) {
      return res.status(404).send("Professor not found.");
    }
    res.send(updatedProfessor);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", requireUser, async (req, res, next) => {
  try {
    const deletedProfessor = await deleteProfessor(req.params.id);
    if (!deletedProfessor) {
      return res.status(404).send("Professor not found.");
    }
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

export default router;
