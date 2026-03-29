package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import com.example.demo.model.Course;
import com.example.demo.repository.CourseRepository;

@Service
public class CourseService {

    @Autowired
    private CourseRepository repo;

    public Course saveCourse(Course c) {
        return repo.save(c);
    }

    public List<Course> getAllCourses() {
        return repo.findAll();
    }

    public void deleteCourse(Long id) {
        repo.deleteById(id);
    }
}