class forgotPasswordPage {
    inputUsername() {
        return cy.get('[name="username"]');
    }

    submitButton() {
        return cy.get('[type="submit"]');
    }

    cancelButton() {
        return cy.get('button[type="button"]').contains('Cancel');
    }

    successMessage() {
        return cy.get('.orangehrm-forgot-password-title');
    }

    errorMessage() {
        return cy.get('.oxd-alert-content');
    }

    usernameValidation() {
        return cy.get('span.oxd-input-group__message');
    }
}
export default new forgotPasswordPage()
