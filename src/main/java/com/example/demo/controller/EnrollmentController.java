package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.example.demo.model.Enrollment;
import com.example.demo.service.EnrollmentService;

@RestController
@RequestMapping("/enrollments")
@CrossOrigin
public class EnrollmentController {

    @Autowired
    private EnrollmentService service;

    @PostMapping
    public Enrollment enroll(@RequestParam Long studentId,
                             @RequestParam Long courseId) {
        return service.enrollStudent(studentId, courseId);
    }

    @GetMapping
    public List<Enrollment> getAll() {
        return service.getAllEnrollments();
    }
}