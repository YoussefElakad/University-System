package com.revkov.spring.Faculties;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping
public class FacController {

    private final FacultyServ FS;

    @GetMapping("/Facs")
    public List<FacultyDTO> Showfacs()
    {
        return FS.ReturnFacs();
    }

    @GetMapping("/Facs/{id}")
    public FacultyDTO Showfacid(@PathVariable Long id)
    {
        return FS.ReturnFacID(id);
    }

    @PostMapping("/Facs/Add")
    public FacultyDTO Insfac(@RequestBody FacultyRequestDTO faculty)
    {
        return FS.Insertfac(faculty);
    }

    @PutMapping("/Facs/Update/{id}")
    public FacultyDTO Upfac(@PathVariable Long id , @RequestBody FacultyRequestDTO fac)
    {
        return FS.Updatefac(id,fac);
    }

    @DeleteMapping("/Facs/Delete/{id}")
    public void Delfac(@PathVariable Long id)
    {
        FS.Deletefac(id);
    }
}
