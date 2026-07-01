package com.revkov.spring.Courses;
import com.revkov.spring.Doctors.Doctor;
import com.revkov.spring.Faculties.Faculty;
import com.revkov.spring.Faculties.Level;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "course")
public class Course
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long courseid;

    private String coursename;


    @ManyToOne
    @JoinColumn(name = "facultyid")
    private Faculty faculty;

    @ManyToOne
    @JoinColumn(name = "levelid")
    private Level level;

    @ManyToOne
    @JoinColumn(name = "doctorid")
    private Doctor doctor;
}
