package com.revkov.spring.Faculties;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FacultyRep extends JpaRepository<Faculty, Long>
{
    Optional<Faculty> findByFacultyname(String facultyname);
    boolean existsByFacultynameIgnoreCase(String facultyname);
}