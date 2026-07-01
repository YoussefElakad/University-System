package com.revkov.spring.Faculties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "faculty")
public class Faculty
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long facultyid;

    private String facultyname;
    private Integer numlevels;
}
