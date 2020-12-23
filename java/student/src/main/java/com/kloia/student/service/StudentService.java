package com.kloia.student.service;

import java.util.ArrayList;
import java.util.List;

import com.kloia.student.dto.StudentFindByClassroomIdDto;
import com.kloia.student.model.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.kloia.student.repository.StudentRepository;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    public List<Student> getAllStudent()
    {
        List<Student> students = new ArrayList<>();
        studentRepository.findAll().forEach(student -> students.add(student));
        return students;
    }

    public Student getStudentById(int id)
    {
        return studentRepository.findById(id).get();
    }

    public List<Student> getStudentByClassroomIds(StudentFindByClassroomIdDto dto)
    {
        return studentRepository.findStudentsByClassroomIds(dto.getClassroomIds());
    }


    public void saveOrUpdate(Student student)
    {
        studentRepository.save(student);
    }

    public int delete(int id)
    {
        studentRepository.deleteById(id);
        return id;
    }
}
