package com.revkov.spring.Courses;

import com.revkov.spring.Doctors.DoctorDTO;
import com.revkov.spring.Faculties.FacultyDTO;
import com.revkov.spring.Faculties.LevelDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class CourseDTO {
    private Long courseid;
    private String coursename;

    private FacultyDTO faculty;
    private LevelDTO level;
    private DoctorDTO doctor;
}