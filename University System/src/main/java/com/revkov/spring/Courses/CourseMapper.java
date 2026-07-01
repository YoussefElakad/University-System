package com.revkov.spring.Courses;

import com.revkov.spring.Doctors.DoctorMapper;
import com.revkov.spring.Faculties.FacultiesMapper;
import lombok.AllArgsConstructor;
import lombok.Builder;
import org.springframework.stereotype.Component;

@Component
@Builder
@AllArgsConstructor
public class CourseMapper {

    private final FacultiesMapper mapper;
    private final DoctorMapper mapperd;

    public CourseDTO toDTO(Course c) {
        return new CourseDTO(
                c.getCourseid(),
                c.getCoursename(),
                mapper.toDTOF(c.getFaculty()),
                mapper.toDTOL(c.getLevel()),
                mapperd.toDTO(c.getDoctor())
        );
    }

    public Course toEntity(CourseDTO dto)
    {
        Course c = new Course();

        c.setCourseid(dto.getCourseid());
        c.setCoursename(dto.getCoursename());
        c.setFaculty(mapper.toEntityF(dto.getFaculty()));
        c.setLevel(mapper.toEntityL(dto.getLevel()));
        c.setDoctor(mapperd.toEntity(dto.getDoctor()));
        return c;
    }
}