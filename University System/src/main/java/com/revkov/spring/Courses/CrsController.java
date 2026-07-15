package com.revkov.spring.Courses;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping
public class CrsController
{
    private final CourseServ CS;


    @GetMapping("/Crs")
    public Page<CourseDTO> Showcrs(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "5") int size)
    {
        return CS.ReturnCrs(page,size);
    }

    @GetMapping("/Crs/{id}")
    public CourseDTO Showcrsid(@PathVariable Long id)
    {
        return CS.ReturnCrsID(id);
    }

    @GetMapping("/Crs/user")
    public List<CourseDTO> Showcrsuser(@RequestParam String username)
    {
        return CS.ReturnCrsUsername(username);
    }

    @PostMapping("/Crs/Add")
    public CourseDTO Inscrs(@RequestBody CourseRequestDTO course)
    {
        return CS.Insertcrs(course);
    }

    @PutMapping("/Crs/Update/{id}")
    public CourseDTO Upcrs(@PathVariable Long id , @RequestBody CourseRequestDTO crs)
    {
        return CS.Updatecrs(id,crs);
    }

    @DeleteMapping("/Crs/Delete/{id}")
    public void Delcrs(@PathVariable Long id)
    {
        CS.Deletecrs(id);
    }
}
