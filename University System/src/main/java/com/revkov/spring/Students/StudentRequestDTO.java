package com.revkov.spring.Students;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
@Builder
@AllArgsConstructor
public class StudentRequestDTO {

    //for update function
    private String first_name;
    private String last_name;
    private Integer age;
    private String email;
    private String address;

    //Not blank for insertion function
    @NotBlank
    private String phone;
    @NotBlank
    private String facultyname;
    @NotBlank
    private Long levelid;
}
