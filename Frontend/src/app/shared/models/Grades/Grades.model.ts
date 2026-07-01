import { Course } from "../Course/course.model";
import { Student } from "../Student/Student.model";

export class Grades {
    gradeid? : number;

    student? : Student;
    course? : Course;

    grade? : number;
}