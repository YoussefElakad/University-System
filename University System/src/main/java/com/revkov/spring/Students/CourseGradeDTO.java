package com.revkov.spring.Students;

import com.revkov.spring.Courses.CourseDTO;
import com.revkov.spring.Grades.GradesDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class CourseGradeDTO {
    private CourseDTO Course;
    private GradesDTO Grade;
}