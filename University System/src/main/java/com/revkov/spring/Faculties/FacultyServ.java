package com.revkov.spring.Faculties;

import com.revkov.spring.Generic.BaseCRUDServices;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FacultyServ extends BaseCRUDServices<Faculty,Long>
{
    private final FacultyRep repf;
    private final FacultiesMapper mapper;

    public FacultyServ(FacultyRep repf, FacultiesMapper mapper) {
        super(repf);
        this.repf = repf;
        this.mapper = mapper;
    }

    public List<FacultyDTO> ReturnFacs()
    {
        return getAll(mapper::toDTOF);
    }

    public FacultyDTO ReturnFacID(Long id) {
        return getByID(id,mapper::toDTOF);
    }

    public  void Deletefac(Long id)
    {
        deleteEnt(id);
    }

    public FacultyDTO Updatefac(Long id,FacultyRequestDTO dto)
    {

        Faculty f = new Faculty(id, dto.getFacultyname(), dto.getNumlevels());

        repf.save(f);

        return mapper.toDTOF(f);
    }

    public FacultyDTO Insertfac(FacultyRequestDTO dto)
    {
        if (repf.existsByFacultynameIgnoreCase(dto.getFacultyname()))
            throw new RuntimeException("Course Already Exists");

        Faculty f = new Faculty(null,dto.getFacultyname(),dto.getNumlevels());

        repf.save(f);
        return mapper.toDTOF(f);
    }
}
