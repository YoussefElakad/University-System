package com.revkov.spring.Students;
import com.revkov.spring.Faculties.Faculty;
import com.revkov.spring.Faculties.Level;
import com.revkov.spring.Users.Users;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "student")
public class Student
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long studentid;

    private String first_name;
    private String last_name;
    private Integer age;
    private String email;
    private String phone;
    private String address;


    @ManyToOne
    @JoinColumn(name = "facultyid")
    private Faculty faculty;

    @ManyToOne
    @JoinColumn(name = "levelid")
    private Level level;

    @OneToOne
    @JoinColumn(name = "userid",unique = true)
    private Users users;

    @Column(unique = true)
    private String studentcode;
}
