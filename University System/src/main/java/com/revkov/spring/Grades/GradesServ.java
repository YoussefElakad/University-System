package com.revkov.spring.Grades;

import com.revkov.spring.Courses.Course;
import com.revkov.spring.Courses.CourseMapper;
import com.revkov.spring.Courses.CourseRep;
import com.revkov.spring.Doctors.StudentGradeDTO;
import com.revkov.spring.Doctors.StudentMapper;
import com.revkov.spring.Generic.BaseCRUDServices;
import com.revkov.spring.Students.CourseGradeDTO;
import com.revkov.spring.Students.Student;
import com.revkov.spring.Students.StudentRep;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GradesServ extends BaseCRUDServices<Grades,Long>
{
    private final GradesRep repg;
    private final StudentRep reps;
    private final CourseRep repc;
    private final GradesMapper mapper;
    private final StudentMapper mappers;
    private final CourseMapper mapperc;

    public GradesServ(GradesRep repg, StudentRep reps, CourseRep repc, GradesMapper mapper, StudentMapper mappers, CourseMapper mapperc) {
        super(repg);
        this.repg = repg;
        this.reps = reps;
        this.repc = repc;
        this.mapper = mapper;
        this.mappers = mappers;
        this.mapperc = mapperc;
    }

    public Page<GradesDTO> ReturnGrds(int page, int size)
    {
        return getPages(page,size,"gradeid",mapper::toDTO);
    }

    public GradesDTO ReturnGrdID(Long id) {
        return getByID(id,mapper::toDTO);
    }

    public  void DeleteGrd(Long id)
    {
        deleteEnt(id);
    }

    public GradesDTO UpdateGrd(Long id,GradesRequestDTO dto)
    {
        Student s = reps.findById(dto.getStudentid()).orElseThrow(() -> new RuntimeException("Student Does not Exist"));
        Course c = repc.findByCoursename(dto.getCoursename()).orElseThrow(()-> new RuntimeException("Course Does Not Exist"));

        if(dto.getGrade() > 100 || dto.getGrade() < 0)
            throw new RuntimeException("Grade Must be Between 0 and 100");
        Grades g = new Grades(id, s, c,dto.getGrade());

        repg.save(g);

        return mapper.toDTO(g);
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
