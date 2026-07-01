package com.revkov.spring.Grades;

import com.revkov.spring.Courses.Course;
import com.revkov.spring.Students.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GradesRep extends JpaRepository<Grades, Long>
{
    boolean existsByStudentAndCourse(Student student, Course course);
    List<Grades> findAllByCourse(Course course);
    List<Grades> findAllByStudent(Student student);
    Long countByCourse(Course course);
}