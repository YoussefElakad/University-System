package com.revkov.spring.Grades;
import com.revkov.spring.Courses.Course;
import com.revkov.spring.Students.Student;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "grades")
public class Grades
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long gradeid;

    @ManyToOne
    @JoinColumn(name = "studentid")
    private Student student;

    @ManyToOne
    @JoinColumn(name = "courseid")
    private Course course;

    private Float grade;
}
