Feature: Create user 
    As an admin
    I want to create users
    SO that they can be assigned to multiple task

    Scenario outline: Create multiple users
        Given an admin has logged into the user registration page
        When an admin creates user with email <email> username <username>  password <password>
        Then user <username> should be created

        Examples:
            | email           | username   | password |
            | user1@email.com | user1     | password |
            | user2@email.com | user2     | password |
            | user3@email.com | user3     | password |
            | user4@email.com | user4     | password |
            | user5@email.com | user5     | password |
        
    Scenario: Create multiple folders
        Given a user has logged in with username "username" and password "password" 
        When a user creates the following folders
        | foldername | creationdate |
        | folder1    |  2021-12-03  |
        | folder2    |  2021-12-04  |
        | folder3    |  2021-12-05  |
        | folder4    |  2021-12-05  |
        | folder5    |  2021-12-06  |
        Then folders should be created
        
        


