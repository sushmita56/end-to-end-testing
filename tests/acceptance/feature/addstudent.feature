Feature: Add student
    As a user
    I want to add students 
    So that student name is displayed on the home page list
    
    Background: 
        Given the user has logged in with username "sagar12345" and password "sagar12345" 

    Scenario: Add students with details
        When the user adds student with name "sushmita", email "poudel@gmail.com", address "butwal", phone "9827214742", qualification "bachelor", gpa "3", destination "usa", ielts "no"
        Then success message "User Registration Successfull!!" should be displayed 

    Scenario: Check the visibility of ielts band form 
        When the user adds student with name "sushmita", email "poudel@gmail.com", address "butwal", phone "9827214742", qualification "bachelor", gpa "3", destination "usa", ielts "yes"
        Then ielts band form should be visible 


    Scenario: Add students with ielts  score
        When the user adds student with name "sushmita", email "poudel@gmail.com", address "butwal", phone "9827214742", qualification "bachelor", gpa "3", destination "usa", ielts "yes"
        Then ielts band form should be visible