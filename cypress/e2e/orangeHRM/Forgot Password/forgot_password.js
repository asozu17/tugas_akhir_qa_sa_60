import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import forgotPasswordPage from "../../../pom/forgot_password/forgotPassword.cy";

// Scenario 1: Valid Username
Given('I am on the forgot password page', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode');
    cy.wait(2000);
});

When('I submit a valid username', () => {
    forgotPasswordPage.inputUsername().type('Admin');
    forgotPasswordPage.submitButton().click();
});

Then('I should see a success message', () => {
    forgotPasswordPage.successMessage().should('have.text', 'Reset Password link sent successfully');
});

// Scenario 2: Invalid Username
When('I submit an invalid username', () => {
    forgotPasswordPage.inputUsername().type('InvalidUser');
    forgotPasswordPage.submitButton().click();
});

Then('I should see an error message', () => {
    forgotPasswordPage.errorMessage().should('contain.text', 'No account found with that username');
});

// Scenario 3: Empty Username
When('I submit an empty username', () => {
    forgotPasswordPage.inputUsername().clear();
    forgotPasswordPage.submitButton().click();
});

Then('I should see a validation message for the empty field', () => {
    forgotPasswordPage.usernameValidation().should('have.text', 'Required');
});

// Scenario 4: Press Cancel Button
When('I click the Cancel button', () => {
    forgotPasswordPage.cancelButton().click(); // Assuming we have a method to access the Cancel button
});

Then('I should be redirected back to the login page', () => {
    cy.url().should('include', '/web/index.php/auth/login'); // Validating that user is redirected to login page
});

