package com.example.demo.service;

import com.example.demo.model.Student;
import com.example.demo.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    private final StudentRepository repo;

    public StudentService(StudentRepository repo) {
        this.repo = repo;
    }

    public Student addStudent(Student s) {
        return repo.save(s);
    }

    public List<Student> getAllStudents() {
        return repo.findAll();
    }

    public Student getStudentById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public Student updateStudent(Long id, Student newData) {
        return repo.findById(id).map(s -> {
            s.setName(newData.getName());
            s.setEmail(newData.getEmail());
            return repo.save(s);
        }).orElse(null);
    }

    public String deleteStudent(Long id) {
        repo.deleteById(id);
        return "Deleted Successfully";
    }
}
