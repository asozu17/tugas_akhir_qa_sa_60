Feature: Login Feature

  Scenario: Login with Valid Credentials
    Given I visit the URL
    And I should see the homepage
    When I submit the Username
    And I submit the Password
    Then I click the button Login
    Then I verify login success

  Scenario: Login with Invalid Credentials
    Given I visit the URL
    When I submit invalid Username
    And I submit invalid Password
    Then I click the button Login
    Then I verify login failure message

  Scenario: Login with Empty Credentials
    Given I visit the URL
    When I submit empty Username
    And I submit empty Password
    Then I click the button Login
    Then I verify validation messages

  Scenario: Verify Forgot Password Link
    Given I visit the URL
    When I click on Forgot your password link
    Then I should be redirected to the reset password page
