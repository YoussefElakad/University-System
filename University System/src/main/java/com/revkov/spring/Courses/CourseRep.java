package com.revkov.spring.Courses;

import com.revkov.spring.Doctors.Doctor;
import com.revkov.spring.Faculties.Faculty;
import com.revkov.spring.Faculties.Level;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseRep extends JpaRepository<Course, Long>
{
    Optional<Course> findByCoursename(String coursename);
    List<Course> findByFacultyAndLevel(Faculty faculty, Level level);
    List<Course> findByDoctor(Doctor doctor);
    boolean existsByCoursenameIgnoreCase(String coursename);
}