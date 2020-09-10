Feature: User Authentication with Gluu Server

    Check user status, authentication and access resources

    Scenario: User is not login so should not able to see profile details
    When user request for profile
    Then user should get login button

    Scenario: User should redirect after clicking on login button
    When user click on login button
    Then user should get redirected to OP Server

    Scenario: User Authentication and able to see profile details
    When user click on login button, redirect to op and enter credentials "ross" and "Ross@123"
    Then user should get redirected back to website and see profile details with name "ross"
    
    Scenario: Another User Authentication and able to see profile details
    When user click on login button, redirect to op and enter credentials "joey" and "Joey@123"
    Then user should get redirected back to website and see profile details with name "joey"
    
    Scenario: User Authentication with external OpenID Provider Server and should able to see the profile details
    When user click on login button, redirect to authz server, select external op server provider "p2gluu"
    When redirect to external OP, enter credentials "monica" and "Monica@123", and user authentication
    When back to authz server, add and authenticate user
    Then user should get redirected back to website and see profile details with name "monica"

    Scenario: Another User Authentication with external OpenID Provider Server and should able to see the profile details
    When user click on login button, redirect to authz server, select external op server provider "p2gluu"
    When redirect to external OP, enter credentials "monica" and "Monica@123", and user authentication
    When back to authz server, add and authenticate user
    Then user should get redirected back to website and see profile details with name "monica"

    Scenario: Using passport-openidconnect tool, User Authentication and able to see profile details
    When user click on oidc login button, redirect to op and enter credentials "ross" and "Ross@123"
    Then user should get redirected back to website and see profile details with name "ross"