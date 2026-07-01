import { Doctor } from "../Doctor/Doctor.model";
import { Faculty } from "../Faculty/Faculty.model";
import { Level } from "../Faculty/Level.model";

export class Course {
    courseid?: number;

    coursename!: string;
    faculty!: Faculty;
    level?: Level;
    doctor?:Doctor;
}