package com.revkov.spring.Grades;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class GradesRequestDTO {
    private Long studentid;

    private String coursename;
    private Float grade;
}
