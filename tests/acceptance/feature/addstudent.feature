Feature: Add student
    As a user
    I want to add students
    So that student name is displayed on the home page list

    Background:
        Given the user has browsed to the login page
        And the user has logged in with username "sagar12345" and password "sagar12345"

    Scenario: Add students with details
        When the user adds student with following details
            | name          | sushank             |
            | email         | sushank56@gmail.com |
            | address       | butwal              |
            | phone         | 9876231452          |
            | qualification | bachelors           |
            | gpa           | 4                   |
            | destination   | canada              |
            | ielts         | no                  |
        Then ielts band form should not be visible

    Scenario: Add students with ielts  score
        When the user adds student with following details
            | name          | sushank             |
            | email         | sushank56@gmail.com |
            | address       | butwal              |
            | phone         | 9876231452          |
            | qualification | bachelors           |
            | gpa           | 4                   |
            | destination   | canada              |
            | ielts         | yes                 |
            | listening     | 7                   |
            | reading       | 6                   |
            | writing       | 8                   |
            | speaking      | 5                   |
            | overallBand   | 7                   |
        Then success message "User Registration Successfull!!" should be displayed

