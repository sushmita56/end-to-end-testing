Feature: Edit
    As a User
    I want to edit student details
    So that I can make corrections

    Background:
        Given the user has browsed to the login page
        And the user has logged in with username "sagar12345" and password "sagar12345"

    Scenario: Edit student details
        When the user clicks edit button
        Then student details update page should be visible

    Scenario: Edit and save student details
        When the user clicks edit button
        Then the user edits and save student details
            | name          | Sushmita Poudel |
            | email         | arneu@gmail.com |
            | address       | Germany         |
            | phone         | 123467890       |
            | qualification | masters         |
            | gpa           | 4               |
            | destination   | usa             |
            | ielts         | no              |
        And success message 'User Update Successfull' should be displayed
