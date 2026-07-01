package com.revkov.spring.Grades;

import com.revkov.spring.Courses.CourseMapper;
import com.revkov.spring.Doctors.StudentMapper;
import lombok.AllArgsConstructor;
import lombok.Builder;
import org.springframework.stereotype.Component;

@Component
@Builder
@AllArgsConstructor
public class GradesMapper {

    private final StudentMapper mappers;
    private final CourseMapper mapperc;

    public GradesDTO toDTO(Grades g) {
        return new GradesDTO(
                g.getGradeid(),
                mappers.toDTO(g.getStudent()),
                mapperc.toDTO(g.getCourse()),
                g.getGrade()
        );
    }

    public Grades toEntity(GradesDTO dto)
    {
        Grades g = new Grades();

        g.setGradeid(dto.getGradeid());
        g.setStudent(mappers.toEntity(dto.getStudent()));
        g.setCourse(mapperc.toEntity(dto.getCourse()));
        g.setGrade(dto.getGrade());
        return g;
    }
}