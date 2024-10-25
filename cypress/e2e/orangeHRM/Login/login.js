import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import loginPage from "../../../pom/login/login.cy";

Given('I visit the URL', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.wait(2000);
});

When('I should see the homepage', () => {
    loginPage.verifyLoginPage().should('have.text', 'Login');
});

When('I submit the Username', () => {
    loginPage.inputUsername().type('Admin');
});

When('I submit the Password', () => {
    loginPage.inputPassword().type('admin123');
});

Then('I click the button Login', () => {
    // Check if Username or Password field is empty before submitting the form
    loginPage.inputUsername().invoke('val').then((username) => {
        loginPage.inputPassword().invoke('val').then((password) => {
            if (username === '' || password === '') {
                // If either field is empty, check for validation messages
                loginPage.buttonSubmit().click();
            } else {
                // If both fields are filled, intercept the request and validate the response
                cy.intercept('POST', '**/auth/validate').as('loginRequest');
                loginPage.buttonSubmit().click();
                cy.wait('@loginRequest').its('response.statusCode').should('eq', 302);
            }
        });
    });
});


Then('I verify login success', () => {
    loginPage.dashboardPage().should('contain.text', 'Dashboard');
});

// Scenario: Login with Invalid Credentials
When('I submit invalid Username', () => {
    loginPage.inputUsername().type('InvalidUser');
});

When('I submit invalid Password', () => {
    loginPage.inputPassword().type('InvalidPassword');
});

Then('I verify login failure message', () => {
    loginPage.invalidCredentials().should('have.text', 'Invalid credentials');
});

// Scenario: Login with Empty Credentials
When('I submit empty Username', () => {
    loginPage.inputUsername().clear();
});

When('I submit empty Password', () => {
    loginPage.inputPassword().clear();
});

Then('I verify validation messages', () => {
    loginPage.usernameValidation().should('be.visible');
    loginPage.passwordValidation().should('be.visible');
});

// Scenario: Toggle Password Visibility
Then('I should see the password as plain text', () => {
    loginPage.inputPassword().should('have.attr', 'type', 'text');
});

Then('I should see the password as asterisks', () => {
    loginPage.inputPassword().should('have.attr', 'type', 'password');
});

// Scenario: Forgot Password Link
When('I click on Forgot your password link', () => {
    cy.intercept('GET', '**/auth/requestPasswordResetCode').as('resetPageRequest');
    loginPage.forgotPasswordLink().click();
});

Then('I should be redirected to the reset password page', () => {
    cy.wait('@resetPageRequest').its('response.statusCode').should('eq', 200);
    cy.url().should('include', '/web/index.php/auth/requestPasswordResetCode');
});
