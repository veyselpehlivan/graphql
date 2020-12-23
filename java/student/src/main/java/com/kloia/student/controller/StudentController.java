package com.kloia.student.controller;

import java.util.List;

import com.kloia.student.dto.StudentFindByClassroomIdDto;
import com.kloia.student.model.Student;
import com.kloia.student.service.StudentService;
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
    
    @Autowired
    StudentService studentService;

    @GetMapping("/student")
    private List<Student> getAllStudent()
    {
        return studentService.getAllStudent();
    }

    @PostMapping("/student/find-by-classroom-ids")
    private List<Student> getStudentByClassroomIds(@RequestBody StudentFindByClassroomIdDto dto)
    {
        return studentService.getStudentByClassroomIds(dto);
    }
    
    @GetMapping("/student/{id}")
    private Student getStudent(@PathVariable("id") int id)
    {
        return studentService.getStudentById(id);
    }
   
    @DeleteMapping("/student/{id}")
    private int deleteStudent(@PathVariable("id") int id)
    {
        return studentService.delete(id);
    }
   
    @PostMapping("/student")
    private Student saveStudent(@RequestBody Student student)
    {
        studentService.saveOrUpdate(student);
        return student;
    }
}
