package com.revkov.spring.Faculties;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Sort;
import java.util.List;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
@AllArgsConstructor
public class FacultyServ
{
    private final FacultyRep repf;
    private final FacultiesMapper mapper;

    public List<FacultyDTO> ReturnFacs()
    {
        return repf.findAll(Sort.by("facultyid"))
                .stream()
                .map(mapper::toDTOF)
                .collect(Collectors.toList());
    }

    public FacultyDTO ReturnFacID(Long id) {
        return repf.findById(id).map(mapper::toDTOF).orElse(null);
    }

    public FacultyDTO Insertfac(FacultyRequestDTO dto)
    {
        if (repf.existsByFacultynameIgnoreCase(dto.getFacultyname()))
            throw new RuntimeException("Course Already Exists");

        Faculty f = new Faculty(null,dto.getFacultyname(),dto.getNumlevels());

        repf.save(f);
        return mapper.toDTOF(f);
    }

    public  FacultyDTO Deletefac(Long id)
    {
        Faculty f = repf.findById(id).orElseThrow(()-> new RuntimeException("Faculty Not Found"));
        repf.deleteById(id);

        return mapper.toDTOF(f);
    }

    public FacultyDTO Updatefac(Long id,FacultyRequestDTO dto)
    {

        Faculty f = new Faculty(id, dto.getFacultyname(), dto.getNumlevels());

        repf.save(f);

        return mapper.toDTOF(f);
    }
}
