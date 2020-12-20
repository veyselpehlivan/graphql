package com.kloia.h2example.controller;

import java.util.List;

import com.kloia.h2example.model.Student;
import com.kloia.h2example.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

//creating RestController
@RestController
public class StudentController
{
    //autowired the StudentService class
    @Autowired
    StudentService studentService;
    //creating a get mapping that retrieves all the students detail from the database
    @GetMapping("/student")
    private List<Student> getAllStudent()
    {
        return studentService.getAllStudent();
    }
    //creating a get mapping that retrieves the detail of a specific student
    @GetMapping("/student/{id}")
    private Student getStudent(@PathVariable("id") int id)
    {
        return studentService.getStudentById(id);
    }
    //creating a delete mapping that deletes a specific student
    @DeleteMapping("/student/{id}")
    private int deleteStudent(@PathVariable("id") int id)
    {
        return studentService.delete(id);
    }
    //creating post mapping that post the student detail in the database
    @PostMapping("/student")
    private Student saveStudent(@RequestBody Student student)
    {
        studentService.saveOrUpdate(student);
        return student;
    }
}