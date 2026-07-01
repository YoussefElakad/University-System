package com.revkov.spring.Faculties;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class LevelDTO {
    private Long levelid;

    private String levelname;
}
