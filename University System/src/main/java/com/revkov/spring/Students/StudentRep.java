package com.revkov.spring.Students;

import com.revkov.spring.Users.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface StudentRep extends JpaRepository<Student, Long>
{
    Boolean existsByStudentcode(String studentcode);
    Optional<Student> findByStudentcode (String studentcode);
    Optional<Student> findByUsers (Users users);
}