Feature: User Authentication with Gluu Server

    Check user status, authentication and access resources

    Scenario: User is not login so should not able to see profile details
    When user request for profile
    Then user should get login button

    Scenario: User should redirect after clicking on login button
    When user click on login button
    Then user should get redirected to OP Server

    Scenario: User Authentication
    When user click on login button, redirect to op and enter credentials "ross" and "Ross@123"
    Then user should get redirected back to website and see profile details with name "ross"
    