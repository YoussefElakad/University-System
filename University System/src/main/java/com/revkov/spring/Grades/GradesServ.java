package com.revkov.spring.Grades;

import com.revkov.spring.Courses.Course;
import com.revkov.spring.Courses.CourseMapper;
import com.revkov.spring.Courses.CourseRep;
import com.revkov.spring.Doctors.StudentGradeDTO;
import com.revkov.spring.Doctors.StudentMapper;
import com.revkov.spring.Students.CourseGradeDTO;
import com.revkov.spring.Students.Student;
import com.revkov.spring.Students.StudentRep;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Sort;
import java.util.List;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
@AllArgsConstructor
public class GradesServ
{
    private final GradesRep repg;
    private final StudentRep reps;
    private final CourseRep repc;
    private final GradesMapper mapper;
    private final StudentMapper mappers;
    private final CourseMapper mapperc;

    public List<GradesDTO> ReturnGrds()
    {
        return repg.findAll(Sort.by("gradeid"))
                .stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }

    public GradesDTO ReturnGrdID(Long id) {
        return repg.findById(id).map(mapper::toDTO).orElse(null);
    }

    public GradesDTO InsertGrd(GradesRequestDTO dto)
    {
        Student s = reps.findById(dto.getStudentid()).orElseThrow(()->new RuntimeException("Student Does not Exist"));
        Course c = repc.findByCoursename(dto.getCoursename()).orElseThrow(()-> new RuntimeException("Course Does Not Exist"));
        if (repg.existsByStudentAndCourse(s,c))
            throw new RuntimeException("Course Already Registered For This Student");
        if (repg.countByCourse(c) >= 1)
            throw new RuntimeException("Course Limit Reached");

        Grades g = new Grades(null,s,c,dto.getGrade());

        repg.save(g);
        return mapper.toDTO(g);
    }

    public  GradesDTO DeleteGrd(Long id)
    {
        Grades g = repg.findById(id).orElseThrow(()-> new RuntimeException("Grade Does not Exist"));
        repg.deleteById(id);

        return mapper.toDTO(g);
    }

    public GradesDTO UpdateGrd(Long id,GradesRequestDTO dto)
    {
        Student s = reps.findById(dto.getStudentid()).orElseThrow(() -> new RuntimeException("Student Does not Exist"));
        Course c = repc.findByCoursename(dto.getCoursename()).orElseThrow(()-> new RuntimeException("Course Does Not Exist"));
        Grades g = new Grades(id, s, c,dto.getGrade());

        repg.save(g);

        return mapper.toDTO(g);
    }

    public List<StudentGradeDTO> ReturnStudsCrs(Long courseid)
    {
        Course c = repc.findById(courseid).orElseThrow(()-> new RuntimeException("Course Not Found"));
        List<Grades> g = repg.findAllByCourse(c);
        return g.stream()
                .map(grade -> StudentGradeDTO.builder()
                        .Student(mappers.toDTO(grade.getStudent()))
                        .Grade(mapper.toDTO(grade))
                        .build())
                .collect(Collectors.toList());
    }

    public List<CourseGradeDTO> ReturnCrsGrds(Long studentid)
    {
        Student s = reps.findById(studentid).orElseThrow(()-> new RuntimeException("Student Not Found"));
        List<Grades> g = repg.findAllByStudent(s);
        return g.stream()
                .map(grade -> CourseGradeDTO.builder()
                        .Course(mapperc.toDTO(grade.getCourse()))
                        .Grade(mapper.toDTO(grade))
                        .build())
                .collect(Collectors.toList());
    }
}
