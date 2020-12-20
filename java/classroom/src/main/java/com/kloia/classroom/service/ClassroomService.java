package com.kloia.classroom.service;

import com.kloia.classroom.model.Classroom;
import com.kloia.classroom.repository.ClassroomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClassroomService {

    @Autowired
    private ClassroomRepository classroomRepository;


    public List<Classroom> getAllClassroom() {

        return (List<Classroom>) classroomRepository.findAll();
    }


    public Classroom getClassroomById(int id) {

        return classroomRepository.findById(id).get();
    }

    public int delete(int id) {

        classroomRepository.deleteById(id);
        return id;
    }

    public Classroom saveOrUpdate(Classroom classroom) {
        classroomRepository.save(classroom);
        return classroom;
    }
}
