package com.revkov.spring.Auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

    @NotBlank(message = "Role Is Requried")
    private String role;
    @NotBlank(message = "Code Is Requried")
    private String code; //Must Exist in students or doctors database

    @NotBlank(message = "First Name Is Requried")
    private String first_name;
    @NotBlank(message = "Last Name Is Requried")
    private String last_name;
    @NotNull(message = "Age Is Requried")
    @Min(value = 18,message = "Age Must Be A Valid Value")
    private Integer age;
    @NotBlank(message = "Email Is Requried")
    @Email(message = "Enter A Valid Email")
    private String email;
    @NotBlank(message = "Address Is Requried")
    private String address;

    @NotBlank(message = "Username Is Requried")
    private String username;
    @NotBlank(message = "Password Is Requried")
    private String password;
}
