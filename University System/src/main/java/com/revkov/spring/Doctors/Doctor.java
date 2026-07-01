package com.revkov.spring.Doctors;

import com.revkov.spring.Users.Users;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "doctor")
public class Doctor
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long doctorid;

    private String first_name;
    private String last_name;
    private Integer age;
    private String email;
    private String phone;
    private String address;

    @OneToOne
    @JoinColumn(name = "userid",unique = true)
    private Users users;

    @Column(unique = true)
    private String doctorcode;
}
