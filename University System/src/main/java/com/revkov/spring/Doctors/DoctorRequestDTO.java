package com.revkov.spring.Doctors;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class DoctorRequestDTO {

    private String first_name;
    private String last_name;
    private Integer age;
    private String email;
    private String phone;
    private String address;
}