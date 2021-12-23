Feature: Login
    As a user
    I want to login to my account
    So that I can organize my account

    Scenario: Login with valid credential
        Given the user has browsed to the login page
        When the user logs in with username "sagar12345" and password "sagar12345" using the webUI
        Then the user should be on the homepage


    Scenario: Login with invalid credential
        Given the user has browsed to the login page
        When the user logs in with username '<usrname>' and password '<pwd>' using the webUI
        Then the error message '<message>' should be displayed on the webUI

        Examples:
            | usrname         | pwd         | message                              |
            | invalidusername | sagar12345  | "Login Credential Did Not Match !!!" |
            | invaliduser     | invalidpass | "Login Credential Did Not Match !!!" |
            | sagar12345      | invalidpass | "Password did not match Matched!!!"  |
