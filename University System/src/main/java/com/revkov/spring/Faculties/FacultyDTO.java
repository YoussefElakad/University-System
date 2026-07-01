package com.revkov.spring.Faculties;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class FacultyDTO {
    private Long facultyid;

    private String facultyname;
    private Integer numlevels;
}
