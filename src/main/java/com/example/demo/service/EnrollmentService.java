package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import com.example.demo.model.*;
import com.example.demo.repository.*;

@Service
public class EnrollmentService {

    @Autowired
    private EnrollmentRepository enrollmentRepo;

    @Autowired
    private StudentRepository studentRepo;

    @Autowired
    private CourseRepository courseRepo;

    public Enrollment enrollStudent(Long studentId, Long courseId) {

        Student student = studentRepo.findById(studentId).orElse(null);
        Course course = courseRepo.findById(courseId).orElse(null);

        if (student == null || course == null) {
            throw new RuntimeException("Student or Course not found");
        }

        Enrollment e = new Enrollment();
        e.setStudent(student);
        e.setCourse(course);
        e.setStatus("ENROLLED");

        return enrollmentRepo.save(e);
    }

    public List<Enrollment> getAllEnrollments() {
        return enrollmentRepo.findAll();
    }
}