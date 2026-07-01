package com.revkov.spring.Doctors;

import com.revkov.spring.Users.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface DoctorRep extends JpaRepository<Doctor, Long>
{
    Boolean existsByDoctorcode(String doctorcode);
    Optional<Doctor> findByDoctorcode (String doctorcode);
    Optional<Doctor> findByUsers (Users users);
}