package com.kloia.student.exception;

public class StudentNotFoundException extends Exception{
    public StudentNotFoundException(String errorMessage) {
        super(errorMessage);
    }
}
