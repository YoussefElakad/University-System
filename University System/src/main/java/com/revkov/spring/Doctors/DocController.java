package com.revkov.spring.Doctors;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping
public class DocController
{
    private final DoctorServ DS;


    @GetMapping("/Docs")
    public Page<DoctorDTO> Showdocs(@RequestParam(defaultValue = "0") int page,@RequestParam(defaultValue = "5") int size)
    {
        return DS.ReturnDocs(page,size);
    }

    @GetMapping("/Docs/{id}")
    public DoctorDTO Showdocid(@PathVariable Long id)
    {
        return DS.ReturnDocID(id);
    }
    @GetMapping("/Docs/user")
    public DoctorDTO showdocuser(@RequestParam String username)
    {
        return DS.ReturnDocUser(username);
    }

    @PostMapping("/Docs/Add")
    public DoctorDTO Insdoc(@RequestBody DoctorRequestDTO doctor)
    {
        return DS.Insertdoc(doctor);
    }

    @PutMapping("/Docs/Update/{id}")
    public DoctorDTO Updoc(@PathVariable Long id , @RequestBody DoctorRequestDTO doc)
    {
        return DS.Updatedoc(id,doc);
    }

    @DeleteMapping("/Docs/Delete/{id}")
    public void Deldoc(@PathVariable Long id)
    {
        DS.Deletedoc(id);
    }
}
