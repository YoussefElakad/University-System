package com.revkov.spring.Faculties;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class FacultyRequestDTO {
    private String facultyname;
    private Integer numlevels;
}
