package com.revkov.spring.Doctors;

import com.revkov.spring.Grades.GradesDTO;
import com.revkov.spring.Students.StudentDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class StudentGradeDTO {
    private StudentDTO Student;
    private GradesDTO Grade;
}