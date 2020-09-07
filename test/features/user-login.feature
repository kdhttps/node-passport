Feature: User Login

    Check user is login or not

    Scenario: User is not log in
    When user request for profile
    Then user should get login button