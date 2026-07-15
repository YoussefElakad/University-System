package com.revkov.spring.Students;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping
public class StudController
{
    private final StudentServ SS;


    @GetMapping("/Studs")
    public Page<StudentDTO> getStudents(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        return SS.ReturnStuds(page, size);
    }

    @GetMapping("/Studs/{id}")
    public StudentDTO Showstudid(@PathVariable Long id)
    {
        return SS.ReturnStudID(id);
    }
    @GetMapping("/Studs/user")
    public StudentDTO showstuduser(@RequestParam String username)
    {
        return SS.ReturnStudUser(username);
    }

    @PostMapping("/Studs/Add")
    public StudentDTO Insstu(@RequestBody StudentRequestDTO student)
    {
        return SS.Insertstu(student);
    }

    @PutMapping("/Studs/Update/{id}")
    public StudentDTO Upstu(@PathVariable Long id , @RequestBody StudentRequestDTO stu)
    {
        return SS.Updatestu(id,stu);
    }

    @DeleteMapping("/Studs/Delete/{id}")
    public void Delstu(@PathVariable Long id)
    {
        SS.Deletestu(id);
    }
}
