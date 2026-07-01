package com.revkov.spring.Students;

import com.revkov.spring.Courses.Course;
import com.revkov.spring.Courses.CourseRep;
import com.revkov.spring.Doctors.StudentGradeDTO;
import com.revkov.spring.Doctors.StudentMapper;
import com.revkov.spring.Faculties.Faculty;
import com.revkov.spring.Faculties.FacultyRep;
import com.revkov.spring.Faculties.Level;
import com.revkov.spring.Faculties.LevelRep;
import com.revkov.spring.Grades.Grades;
import com.revkov.spring.Grades.GradesMapper;
import com.revkov.spring.Grades.GradesRep;
import com.revkov.spring.Users.UsersRep;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Sort;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
@AllArgsConstructor
public class StudentServ
{
    private final StudentRep reps;
    private final FacultyRep repf;
    private final LevelRep repl;
    private final UsersRep repu;
    private final CourseRep repc;
    private final GradesRep repg;
    private final StudentMapper mapper;
    private final GradesMapper mapperg;
    private String generatecode()
    {
        return "STU-" +
                UUID.randomUUID().toString()
                        .substring(0,8)
                        .toUpperCase();

    }

    public List<StudentDTO> ReturnStuds()
    {
        return reps.findAll(Sort.by("studentid"))
                .stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }

    public StudentDTO ReturnStudID(Long id) {
        return reps.findById(id).map(mapper::toDTO).orElse(null);
    }
    public StudentDTO ReturnStudUser(String username) {
        return mapper.toDTO(reps.findByUsers(repu.findByUsername(username).orElseThrow(()->new RuntimeException("User Not Found"))).orElseThrow(()->new RuntimeException("User Not a Student")));
    }

    public StudentDTO Insertstu(StudentRequestDTO dto)
    {
        Faculty f = repf.findByFacultyname(dto.getFacultyname())
                .orElseThrow(() -> new RuntimeException("Faculty Does Not Exist"));

        if (dto.getPhone() == null)
        {
            throw new RuntimeException("Enter a valid phone number");
        }
        if (dto.getLevelid() == null)
        {
            throw new RuntimeException("Student Level Must be Entered");
        }

        Level l = repl.findById(dto.getLevelid())
                .orElseThrow(() -> new RuntimeException("Student Level Invalid"));

        if (l.getLevelid() > f.getNumlevels())
        {
            throw new RuntimeException("Student level exceeds faculty allowed levels");
        }

        Student s = new Student(
                null,
                null,
                null,
                null,
                null,
                dto.getPhone(),
                null,
                f,
                l,
                null,
                generatecode()
        );

        reps.save(s);
        return mapper.toDTO(s);
    }

    public  StudentDTO Deletestu(Long id)
    {
        Student s = reps.findById(id).orElseThrow(()-> new RuntimeException("Student Not Found"));
        reps.deleteById(id);

        return mapper.toDTO(s);
    }

    public StudentDTO Updatestu(Long id,StudentRequestDTO dto)
    {
        Faculty f = repf.findByFacultyname(dto.getFacultyname())
                .orElseThrow(() -> new RuntimeException("Faculty Does Not Exist"));

        Level l = repl.findById(dto.getLevelid())
                .orElseThrow(() -> new RuntimeException("Student Level Invalid"));

        if (l.getLevelid() > f.getNumlevels())
        {
            throw new RuntimeException("Student level exceeds faculty allowed levels");
        }

        Student s = reps.findById(id).orElseThrow(()-> new RuntimeException("Student Does Not Exist"));
        s.setFirst_name(dto.getFirst_name());
        s.setLast_name(dto.getLast_name());
        s.setAge(dto.getAge());
        s.setEmail(dto.getEmail());
        s.setPhone(dto.getPhone());
        s.setAddress(dto.getAddress());
        s.setFaculty(f);
        s.setLevel(l);

        reps.save(s);
        return mapper.toDTO(s);
    }

}
