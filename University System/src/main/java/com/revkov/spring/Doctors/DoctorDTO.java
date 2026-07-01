package com.revkov.spring.Doctors;

import com.revkov.spring.Users.UsersDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class DoctorDTO {
    private Long doctorid;

    private String first_name;
    private String last_name;
    private Integer age;
    private String email;
    private String phone;
    private String address;

    private UsersDTO users;

    private String doctorcode;
}