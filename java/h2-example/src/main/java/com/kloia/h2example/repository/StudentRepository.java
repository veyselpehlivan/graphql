package com.kloia.h2example.repository;

import com.kloia.h2example.model.Student;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends CrudRepository<Student, Integer>
{
}
