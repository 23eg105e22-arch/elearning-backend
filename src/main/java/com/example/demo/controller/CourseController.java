package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.example.demo.model.Course;
import com.example.demo.service.CourseService;

@RestController
@RequestMapping("/courses")
@CrossOrigin
public class CourseController {

    @Autowired
    private CourseService service;

    @PostMapping
    public Course add(@RequestBody Course c) {
        return service.saveCourse(c);
    }

    @GetMapping
    public List<Course> getAll() {
        return service.getAllCourses();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteCourse(id);
    }
}