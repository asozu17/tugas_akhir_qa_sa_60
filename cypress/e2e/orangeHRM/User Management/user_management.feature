Feature: User Management

  Background:
    Given I am logged in as an Admin
    And I navigate to the System Users page

#   Scenario: View System Users List
#    Then I should see the list of system users
#     And the table should contain multiple columns with data

#   Scenario: Add a new user with valid data
#     When I navigate to the Add User page
#     And I fill in the new user form with valid data
#     And I submit the form
#     Then I should see the success message

#   Scenario: Add a new user with empty form
#     When I navigate to the Add User page
#     And I leave the form empty
#     And I submit the empty form
#     Then I should see validation messages for required fields

#   Scenario: Add a new user with invalid password
#     When I navigate to the Add User page
#     And I fill the form with an invalid password
#     And I submit the form for password
#     Then I should see validation error for password field

#   Scenario: Edit an existing user with valid data
#     When I click the Edit button for first user
#     And I modify the user's details with valid data
#     And I submit the form edit
#     Then I should see the updated message

#   Scenario: Delete an existing user with confirmation
#     When I click the Delete button for third user
#     Then I should see a confirmation prompt
#     When I confirm the deletion
#     Then I should see the delete message

#   Scenario: Search for a user by username
#     When I search for a specific user by username
#     Then the search results should contain the user with the given username

#   Scenario: Search for a non-existent user
#     When I search for a non-existent user by username
#     Then I should see a "No Records Found" message

#   Scenario: Sort users by username
#     When I click the Username column header
#     Then the users should be sorted by username in ascending order

  Scenario: Attempt to access the page without being logged in
    When I visit the System Users page without logging in
    Then I should be redirected to the login page
