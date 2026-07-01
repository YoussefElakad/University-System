package com.revkov.spring.Grades;

import com.revkov.spring.Courses.CourseDTO;
import com.revkov.spring.Students.StudentDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class GradesDTO {
    private Long gradeid;

    private StudentDTO student;
    private CourseDTO course;

    private Float grade;
}