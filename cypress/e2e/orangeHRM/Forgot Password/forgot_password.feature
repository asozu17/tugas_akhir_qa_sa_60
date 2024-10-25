Feature: Forgot Password

  Scenario: User requests password reset with a valid username
    Given I am on the forgot password page
    When I submit a valid username
    Then I should see a success message

  Scenario: User requests password reset with an invalid username
    Given I am on the forgot password page
    When I submit an invalid username
    Then I should see an error message

  Scenario: User submits an empty username for password reset
    Given I am on the forgot password page
    When I submit an empty username
    Then I should see a validation message for the empty field

  Scenario: Clicking the Cancel button
    Given I am on the forgot password page
    When I click the Cancel button
    Then I should be redirected back to the login page
