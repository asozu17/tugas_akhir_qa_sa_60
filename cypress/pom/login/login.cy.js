class LoginPage {
    verifyLoginPage() {
        return cy.get('h5').contains('Login');
    }

    inputUsername() {
        return cy.get('[name="username"]');
    }

    inputPassword() {
        return cy.get('[name="password"]');
    }

    buttonSubmit() {
        return cy.get('[type="submit"]');
    }

    invalidCredentials() {
        return cy.get('[class="oxd-alert-content oxd-alert-content--error"]');
    }

    dashboardPage() {
        return cy.get('h6').contains('Dashboard');
    }

    usernameValidation() {
        return cy.get('[class="oxd-input oxd-input--active oxd-input--error"]').eq(0);
    }

    passwordValidation() {
        return cy.get('[class="oxd-input oxd-input--active oxd-input--error"]').eq(1);
    }

    togglePasswordVisibility() {
        return cy.get('.oxd-icon.bi-eye-slash');
    }

    forgotPasswordLink() {
        return cy.get('p').contains('Forgot your password?');
    }

    resetPasswordPage() {
        return cy.get('h6').contains('Reset Password');
    }

    loginAsAdmin() {
        cy.get('input[name="username"]').type('Admin');
        cy.get('input[name="password"]').type('admin123');
        cy.get('.oxd-button').contains('Login').click();
    }
}

export default new LoginPage();
