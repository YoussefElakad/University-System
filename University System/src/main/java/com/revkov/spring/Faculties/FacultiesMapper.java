package com.revkov.spring.Faculties;

import lombok.Builder;
import org.springframework.stereotype.Component;

@Component
@Builder
public class FacultiesMapper {
    public FacultyDTO toDTOF(Faculty f) {
        if (f == null)
            return null;

        return new FacultyDTO(
                f.getFacultyid(),
                f.getFacultyname(),
                f.getNumlevels()
        );
    }

    public Faculty toEntityF(FacultyDTO dto)
    {
        if (dto == null)
            return null;

        Faculty f = new Faculty();

        f.setFacultyid(dto.getFacultyid());
        f.setFacultyname(dto.getFacultyname());
        f.setNumlevels(dto.getNumlevels());

        return f;
    }

    public LevelDTO toDTOL(Level l) {
        if (l == null)
            return null;

        return new LevelDTO(
                l.getLevelid(),
                l.getLevelname()
        );
    }

    public Level toEntityL(LevelDTO dto)
    {
        if (dto == null)
            return null;

        Level l = new Level();

        l.setLevelid(dto.getLevelid());
        l.setLevelname(dto.getLevelname());

        return l;
    }
}
