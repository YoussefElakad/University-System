package com.revkov.spring.Grades;


import com.revkov.spring.Doctors.StudentGradeDTO;
import com.revkov.spring.Students.CourseGradeDTO;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping
public class GrdController {

    private final GradesServ GS;

    @GetMapping("/Grds")
    public Page<GradesDTO> ShowGrds(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "5") int size)
    {
        return GS.ReturnGrds(page,size);
    }

    @GetMapping("/Grds/{id}")
    public GradesDTO ShowGrdsid(@PathVariable Long id)
    {
        return GS.ReturnGrdID(id);
    }

    @PostMapping("/Grds/Add")
    public GradesDTO InsGrds(@RequestBody GradesRequestDTO Grade)
    {
        return GS.InsertGrd(Grade);
    }

    @PutMapping("/Grds/Update/{id}")
    public GradesDTO UpGrds(@PathVariable Long id , @RequestBody GradesRequestDTO Grds)
    {
        return GS.UpdateGrd(id,Grds);
    }

    @DeleteMapping("/Grds/Delete/{id}")
    public void DelGrds(@PathVariable Long id)
    {
        GS.DeleteGrd(id);
    }

    @GetMapping("/Grds/Crs")
    public List<StudentGradeDTO> Showstudscrs(@RequestParam Long courseid)
    {
        return GS.ReturnStudsCrs(courseid);
    }

    @GetMapping("/Grds/Stud")
    public List<CourseGradeDTO> Showgrdsstud(@RequestParam Long studentid)
    {
        return GS.ReturnCrsGrds(studentid);
    }
}
