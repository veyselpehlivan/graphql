package com.kloia.classroom.controller;

import com.kloia.classroom.model.Classroom;
import com.kloia.classroom.service.ClassroomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ClassroomController {

    @Autowired
    private ClassroomService classroomService;

    @GetMapping("/classroom")
    private List<Classroom> getAllClassroom() {
        return classroomService.getAllClassroom();
    }

    @GetMapping("/classroom/{id}")
    private Classroom getClassroom(@PathVariable("id") int id) {
        return classroomService.getClassroomById(id);
    }

    @DeleteMapping("/classroom/{id}")
    private int deleteClassroom(@PathVariable("id") int id) {
        return classroomService.delete(id);
    }

    @PostMapping("/classroom")
    private Classroom saveClassroom(@RequestBody Classroom classroom) {
        return classroomService.saveOrUpdate(classroom);
    }
}
