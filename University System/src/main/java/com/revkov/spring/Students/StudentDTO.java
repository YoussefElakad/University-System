package com.revkov.spring.Students;

import com.revkov.spring.Faculties.FacultyDTO;
import com.revkov.spring.Faculties.LevelDTO;
import com.revkov.spring.Users.UsersDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class StudentDTO {
    private Long studentid;

    private String first_name;
    private String last_name;
    private Integer age;
    private String email;
    private String phone;
    private String address;

    private FacultyDTO faculty;
    private LevelDTO level;
    private UsersDTO users;

    private String studentcode;
}