import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import systemUsersPage from "../../../pom/admin/systemUsers.cy";
import addUserPage from "../../../pom/admin/addUser.cy";
import loginPage from "../../../pom/login/login.cy";

// Utility function to generate a random username
function generateRandomUsername(length = 5) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let username = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        username += characters.charAt(randomIndex);
    }
    return username;
}

// Background
Given('I am logged in as an Admin', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.wait(2000);
    loginPage.loginAsAdmin();
    cy.url().should('include', '/dashboard'); // Pastikan berhasil login
});

Given('I navigate to the System Users page', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers');
    systemUsersPage.verifySystemUsersPage().should('contain.text', 'System Users');
});

// View System Users
Then('I should see the list of system users', () => {
    systemUsersPage.verifySystemUsersPage().should('contain.text', 'System Users');
    systemUsersPage.getUsersTable().should('be.visible');
});

Then('the table should contain multiple columns with data', () => {
    systemUsersPage.verifyTableColumns();
});

// Add a new user
When('I navigate to the Add User page', () => {
    systemUsersPage.clickAddButton();
});

let username; // Declare the username variable here

When('I fill in the new user form with valid data', () => {
    username = generateRandomUsername(10); // Generate a random username
    addUserPage.selectUserRole('Admin');
    addUserPage.inputEmployeeName('John');
    addUserPage.inputUsername(username); // Use the generated username
    addUserPage.selectStatus('Enabled');
    addUserPage.inputPassword('Password123!');
    addUserPage.confirmPassword('Password123!');
});

When('I submit the form', () => {
    cy.intercept('POST', '**/admin/users').as('addUser');
    addUserPage.clickSaveButton();
    cy.wait('@addUser').its('response.statusCode').should('eq', 200);
});

When('I submit the form edit', () => {
    cy.intercept('PUT', '**/admin/users/**').as('editUser'); 
    addUserPage.clickSaveButton();
    cy.wait('@editUser').its('response.statusCode').should('eq', 200);
});

When('I submit the form for password', () => {
    cy.intercept('POST', '**/validation/password').as('validationPassword');
    addUserPage.clickSaveButton();
    cy.wait('@validationPassword').its('response.statusCode').should('eq', 200);
});

When('I submit the empty form', () => {
    addUserPage.clickSaveButton();
});

Then('I should see the success message', () => {
    systemUsersPage.getSuccessMessage().should('contain.text', 'Successfully Saved');
});

Then('I should see the updated message', () => {
    systemUsersPage.getSuccessMessage().should('contain.text', 'Successfully Updated');
});

Then('I should see the delete message', () => {
    systemUsersPage.getSuccessMessage().should('contain.text', 'Successfully Deleted');
});

// Add a new user - Empty form scenario
When('I leave the form empty', () => {
    // Leave all fields empty
});

Then('I should see validation messages for required fields', () => {
    addUserPage.getRequiredFieldErrors().should('contain.text', 'Required');
});

// Add a new user - Invalid password scenario
When('I fill the form with an invalid password', () => {
    username = generateRandomUsername(10); // Generate a random username
    addUserPage.selectUserRole('Admin');
    addUserPage.inputEmployeeName('John');
    addUserPage.inputUsername(username); // Use the generated username
    addUserPage.selectStatus('Enabled');
    addUserPage.inputPassword('short');
    addUserPage.confirmPassword('short');
});

Then('I should see validation error for password field', () => {
    addUserPage.getPasswordValidationError().should('contain.text', 'Should have at least 7 characters');
});

// Edit an existing user
When('I search for a specific user', () => {
    systemUsersPage.searchForUser('user25');
    systemUsersPage.buttonSearch().click(); 
});

When('I click the Edit button for first user', () => {
    systemUsersPage.clickEditFirstUser(); 
});

When('I click the Delete button for third user', () => {
    systemUsersPage.clickDeleteThirdUser(); 
});

When('I modify the user\'s details with valid data', () => {
    username = generateRandomUsername(10); 
    addUserPage.clearUsernameField();
    addUserPage.inputUsername(username);
});

When('I leave the username field blank', () => {
    addUserPage.clearUsernameField();
});

Then('I should see a validation message for username field', () => {
    addUserPage.getUsernameValidationError().should('contain.text', 'Required');
});

// Delete user scenarios
When('I select the checkbox next to the user', () => {
    systemUsersPage.selectUserCheckbox(username); // Use the generated username
});

When('I click the Delete button', () => {
    systemUsersPage.clickDeleteButton();
});

Then('I should see a confirmation prompt', () => {
    systemUsersPage.getDeleteConfirmationDialog().should('be.visible');
});

When('I confirm the deletion', () => {
    cy.intercept('DELETE', '**/admin/users').as('deleteUser');
    systemUsersPage.confirmDeletion();
    cy.wait('@deleteUser').its('response.statusCode').should('eq', 200);
});

When('I cancel the deletion', () => {
    systemUsersPage.cancelDeletion();
});

Then('the user should still appear in the list', () => {
    systemUsersPage.searchForUser(username); // Use the generated username
    systemUsersPage.getUsersTable().should('contain.text', username);
});

// Search scenarios
When('I search for a specific user by username', () => {
    systemUsersPage.searchForUser('Admin'); // Use the generated username
});

Then('the search results should contain the user with the given username', () => {
    systemUsersPage.getUsersTable().should('contain.text', 'Admin'); // Use the generated username
});

When('I search for a non-existent user by username', () => {
    systemUsersPage.searchForUser('nonexistentuser');
});

Then('I should see a "No Records Found" message', () => {
    systemUsersPage.getNoRecordsFoundMessage().should('be.visible');
});

// Sorting and Pagination
When('I click the Username column header', () => {
    systemUsersPage.sortByUsername();
});

Then('the users should be sorted by username in ascending order', () => {
    systemUsersPage.verifyUsersSortedByUsername();
});

When('there are multiple pages of users', () => {
    systemUsersPage.verifyMultiplePages();
});

Then('I should be able to navigate through the pages', () => {
    systemUsersPage.navigateToNextPage();
});

// Access Control
When('I visit the System Users page without logging in', () => {
    cy.clearCookies();
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers');
});

Then('I should be redirected to the login page', () => {
    loginPage.verifyLoginPage();
});

When('I log in as a user with restricted access', () => {
    loginPage.loginAsRestrictedUser();
});

Then('I should see an access denied message', () => {
    systemUsersPage.getAccessDeniedMessage().should('be.visible');
});
