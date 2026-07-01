package com.revkov.spring.Courses;

import com.revkov.spring.Doctors.Doctor;
import com.revkov.spring.Doctors.DoctorRep;
import com.revkov.spring.Faculties.Faculty;
import com.revkov.spring.Faculties.FacultyRep;
import com.revkov.spring.Faculties.Level;
import com.revkov.spring.Faculties.LevelRep;
import com.revkov.spring.Grades.GradesRep;
import com.revkov.spring.Students.Student;
import com.revkov.spring.Students.StudentRep;
import com.revkov.spring.Users.Role;
import com.revkov.spring.Users.Users;
import com.revkov.spring.Users.UsersRep;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Sort;
import java.util.List;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
@AllArgsConstructor
public class CourseServ
{
    private final CourseRep repc;
    private final FacultyRep repf;
    private final LevelRep repl;
    private final DoctorRep repd;
    private final StudentRep reps;
    private final UsersRep repu;
    private final GradesRep repg;
    private final CourseMapper mapper;

    public List<CourseDTO> ReturnCrs()
    {
        return repc.findAll(Sort.by("courseid"))
                .stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }

    public CourseDTO ReturnCrsID(Long id) {
        return repc.findById(id).map(mapper::toDTO).orElse(null);
    }

    public CourseDTO Insertcrs(CourseRequestDTO dto)
    {
        if (repc.existsByCoursenameIgnoreCase(dto.getCoursename()))
            throw new RuntimeException("Course Already Exists");

        Faculty f = repf.findByFacultyname(dto.getFacultyname()).orElseThrow(()-> new RuntimeException("Faculty Does Not Exist"));
        Level l = repl.findById(dto.getLevelid()).orElseThrow(()->new RuntimeException("Level Not Found"));
        Doctor d = null;

        if (dto.getDoctorid() != null)
            d = repd.findById(dto.getDoctorid()).orElseThrow(()->new RuntimeException("Doctor Not Found"));

        Course c = new Course(null,dto.getCoursename(),f,l,d);

        repc.save(c);
        return mapper.toDTO(c);
    }

    public  CourseDTO Deletecrs(Long id)
    {
        Course c = repc.findById(id).orElseThrow(()-> new RuntimeException("Course Not Found"));
        repc.deleteById(id);

        return mapper.toDTO(c);
    }

    public CourseDTO Updatecrs(Long id,CourseRequestDTO dto)
    {
        Faculty f = repf.findByFacultyname(dto.getFacultyname()).orElseThrow(()-> new RuntimeException("Faculty Does Not Exist"));

        if (dto.getLevelid() == null)
            throw new RuntimeException("Enter a valid level");

        Level l = repl.findById(dto.getLevelid()).orElseThrow(()->new RuntimeException("Level Not Found"));
        Doctor d = null;
        if (dto.getDoctorid() != null)
            d = repd.findById(dto.getDoctorid()).orElseThrow(()->new RuntimeException("Doctor Does Not Exist"));

        Course c = new Course(id, dto.getCoursename(), f,l,d);

        repc.save(c);

        return mapper.toDTO(c);
    }

    public List<CourseDTO> ReturnCrsUsername(String username) {
        Users users = repu.findByUsername(username).orElseThrow(()-> new RuntimeException("User Not Found"));
        if (users.getRole().equals(Role.STUDENT))
        {
            Student s = reps.findByUsers(users).orElseThrow(()-> new RuntimeException("User Not a Student or Doesnt Exist"));
            List<Course> allcrs = repc.findByFacultyAndLevel(repf.findById(s.getFaculty().getFacultyid()).get(),repl.findById(s.getLevel().getLevelid()).get());
            allcrs.removeIf(course ->
                    repg.existsByStudentAndCourse(
                            s,
                            course
                    )
            );

            return   allcrs
                    .stream()
                    .map(mapper::toDTO)
                    .collect(Collectors.toList());
        }
        else
        {
            Doctor d = repd.findByUsers(users).orElseThrow(()-> new RuntimeException("User Not a Doctor or Doesnt Exist"));
            return repc.findByDoctor(d)
                    .stream()
                    .map(mapper::toDTO)
                    .collect(Collectors.toList());
        }

    }
}
