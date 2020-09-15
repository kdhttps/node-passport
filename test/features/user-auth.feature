Feature: User Authentication with Gluu Server

    Check user status, authentication and access resources

    Scenario: User is not login so should not able to see profile details
    When user request for profile
    Then user should get login button

    Scenario: User should redirect after clicking on login button
    When user click on "OXD" login button
    Then user should get redirected to OP Server

    Scenario: User Authentication and able to see profile details
    When user click on "OXD" login button, redirect to op and enter credentials "ross" and "Ross@123"
    Then user should get redirected back to website and see profile details with name "ross"
    
    Scenario: Another User Authentication and able to see profile details
    When user click on "OXD" login button, redirect to op and enter credentials "joey" and "Joey@123"
    Then user should get redirected back to website and see profile details with name "joey"
    
    Scenario: User Authentication with external OpenID Provider Server and should able to see the profile details
    When user click on "OXD" login button, redirect to authz server, select external op server provider "p2gluu"
    When redirect to external OP, enter credentials "monica" and "Monica@123", and user authentication
    When back to authz server, add and authenticate user
    Then user should get redirected back to website and see profile details with name "monica"

    Scenario: Using passport-openidconnect tool, User Authentication and able to see profile details
    When user click on "OIDC" login button, redirect to op and enter credentials "ross" and "Ross@123"
    Then user should get redirected back to website and see profile details with name "ross"
        
    Scenario: User Authentication with SAML and will be able to see profile details
    When user click on "SAML" login button, redirect to op and enter credentials "ross" and "Ross@123"
    Then user should get redirected back to website and see profile details with name "ross"

    Scenario: User Authentication with external SAML Provider Server and should able to see the profile details
    When user click on "INBOUND_SAML" login button, redirect to authz server, select external op server provider "p2gluusaml"
    When redirect to external OP, enter credentials "virat" and "Virat@123", and user authentication
    When back to authz server, add and authenticate user
    Then user should get redirected back to website and see profile details with name "virat"

    Scenario: User Authentication with external OpenID Provider Server and auth should fail because email linking is off
              User cannot login with Inbound passport for p2gluu provider
    When user click on "OXD" login button, redirect to authz server, select external op server provider "p2gluu"
    When redirect to external OP, enter credentials "dhoni" and "Dhoni@123", and user authentication
    Then failed auth, user with email is already exist

    Scenario: User Authentication with external OpenID Provider Server and auth should get success because email linking is on
              User can login with Inbound passport for p2gluu_email_linking provider
    When user click on "OXD" login button, redirect to authz server, select external op server provider "p2gluu_email_linking"
    When redirect to external OP, enter credentials "dhoni" and "Dhoni@123", and user authentication
    When back to authz server, add and authenticate user
    Then user should get redirected back to website and see profile details with name "dhoni"
