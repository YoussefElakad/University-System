package com.revkov.spring.Faculties;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LevelRep extends JpaRepository<Level, Long>
{
}