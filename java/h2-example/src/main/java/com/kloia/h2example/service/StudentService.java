package com.kloia.h2example.service;

import java.util.ArrayList;
import java.util.List;

import com.kloia.h2example.model.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.kloia.h2example.repository.StudentRepository;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;
    //getting all student records
    public List<Student> getAllStudent()
    {
        List<Student> students = new ArrayList<Student>();
        studentRepository.findAll().forEach(student -> students.add(student));
        return students;
    }
    //getting a specific record
    public Student getStudentById(int id)
    {
        return studentRepository.findById(id).get();
    }
    public void saveOrUpdate(Student student)
    {
        studentRepository.save(student);
    }
    //deleting a specific record
    public int delete(int id)
    {
        studentRepository.deleteById(id);
        return id;
    }
}
