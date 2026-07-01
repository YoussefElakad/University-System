package com.revkov.spring.Faculties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "level")
public class Level
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long levelid;

    private String levelname;
}
