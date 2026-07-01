package com.revkov.spring.Doctors;

import com.revkov.spring.Faculties.FacultiesMapper;
import com.revkov.spring.Students.Student;
import com.revkov.spring.Students.StudentDTO;
import com.revkov.spring.Users.UsersMapper;
import lombok.AllArgsConstructor;
import lombok.Builder;
import org.springframework.stereotype.Component;

@Component
@Builder
@AllArgsConstructor
public class StudentMapper {

    private final FacultiesMapper mapper;
    private final UsersMapper mapperu;

    public StudentDTO toDTO(Student s) {
        return new StudentDTO(
                s.getStudentid(),
                s.getFirst_name(),
                s.getLast_name(),
                s.getAge(),
                s.getEmail(),
                s.getPhone(),
                s.getAddress(),
                mapper.toDTOF(s.getFaculty()),
                mapper.toDTOL(s.getLevel()),
                mapperu.toDTO(s.getUsers()),
                s.getStudentcode()

        );
    }

    public Student toEntity(StudentDTO dto)
    {
        Student s = new Student();

        s.setStudentid(dto.getStudentid());
        s.setFirst_name(dto.getFirst_name());
        s.setLast_name(dto.getLast_name());
        s.setAge(dto.getAge());
        s.setEmail(dto.getEmail());
        s.setPhone(dto.getPhone());
        s.setAddress(dto.getAddress());

        s.setFaculty(mapper.toEntityF(dto.getFaculty()));
        s.setLevel(mapper.toEntityL(dto.getLevel()));
        s.setUsers(mapperu.toEntity(dto.getUsers()));

        s.setStudentcode(dto.getStudentcode());
        return s;
    }
}