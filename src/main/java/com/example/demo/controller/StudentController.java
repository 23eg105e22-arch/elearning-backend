package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.example.demo.model.Student;
import com.example.demo.service.StudentService;

@RestController
@RequestMapping("/students")
@CrossOrigin
public class StudentController {

    @Autowired
    private StudentService service;
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteStudent(id);
    }

    @PostMapping
    public Student add(@RequestBody Student s) {
        return service.saveStudent(s);
    }

    @GetMapping
    public List<Student> getAll() {
        return service.getAllStudents();
    }
    @PutMapping("/{id}")
    public Student update(@PathVariable Long id, @RequestBody Student s) {
        s.setId(id);
        return service.saveStudent(s);
    }
}