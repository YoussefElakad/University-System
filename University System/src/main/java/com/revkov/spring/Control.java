package com.revkov.spring;

import java.util.List;

import com.revkov.spring.Courses.CourseDTO;
import com.revkov.spring.Courses.CourseRequestDTO;
import com.revkov.spring.Courses.CourseServ;
import com.revkov.spring.Doctors.DoctorDTO;
import com.revkov.spring.Doctors.DoctorRequestDTO;
import com.revkov.spring.Doctors.DoctorServ;
import com.revkov.spring.Faculties.FacultyDTO;
import com.revkov.spring.Faculties.FacultyRequestDTO;
import com.revkov.spring.Faculties.FacultyServ;
import com.revkov.spring.Grades.GradesDTO;
import com.revkov.spring.Grades.GradesRequestDTO;
import com.revkov.spring.Grades.GradesServ;
import com.revkov.spring.Students.CourseGradeDTO;
import com.revkov.spring.Students.StudentDTO;
import com.revkov.spring.Doctors.StudentGradeDTO;
import com.revkov.spring.Students.StudentRequestDTO;
import com.revkov.spring.Students.StudentServ;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping
public class Control
{
    private final StudentServ SS;
    private final FacultyServ FS;
    private final CourseServ CS;
    private final GradesServ GS;
    private final DoctorServ DS;


    //Students -----------------------------------------------------------
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
    public StudentDTO Delstu(@PathVariable Long id)
    {
        return SS.Deletestu(id);
    }
    //Students -----------------------------------------------------------

    //Faculties -----------------------------------------------------------
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
    public FacultyDTO Delfac(@PathVariable Long id)
    {
        return FS.Deletefac(id);
    }
    //Faculties -----------------------------------------------------------

    //Courses -----------------------------------------------------------
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
    public CourseDTO Delcrs(@PathVariable Long id)
    {
        return CS.Deletecrs(id);
    }
    //Courses -----------------------------------------------------------

    //Grades -----------------------------------------------------------
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
    public GradesDTO DelGrds(@PathVariable Long id)
    {
        return GS.DeleteGrd(id);
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
    //Grades -----------------------------------------------------------

    //Doctors -----------------------------------------------------------
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
    public DoctorDTO Deldoc(@PathVariable Long id)
    {
        return DS.Deletedoc(id);
    }
    //Doctors -----------------------------------------------------------
}
