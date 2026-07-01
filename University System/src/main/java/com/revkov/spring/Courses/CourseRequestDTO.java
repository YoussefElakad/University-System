package com.revkov.spring.Courses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class CourseRequestDTO {
    private String coursename;
    private String facultyname;
    private Long levelid;
    private Long doctorid;
}
