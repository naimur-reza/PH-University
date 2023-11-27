import { NextFunction, Request, Response } from "express";
import { StudentServices } from "./student.service";
import { studentValidationSchema } from "./student.validation";
import sendResponse from "../utils/sendResponse";
import httpStatus from "http-status";

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const student = req.body;

    const zodParseData = studentValidationSchema.parse(student);

    await StudentServices.createStudentInDb(zodParseData);

    sendResponse(res, {
      success: true,
      message: "Student info inserted successfully",
      data: res,
      statusCode: httpStatus.OK,
    });
  } catch (error) {
    console.error("Error in createStudent:", error);
    next(error);
  }
};

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await StudentServices.getStudents();
    return res.status(200).send(data);
  } catch (error) {
    console.error("Error in getAllStudents:", error);
    next(error);
  }
};

const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const data = await StudentServices.getSingleStudentFromDB(id);
    return res.status(200).send(data);
  } catch (error) {
    console.error("Error in getSingleStudent:", error);
    next(error);
  }
};

export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
