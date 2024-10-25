class AddUserPage {
    selectUserRole(role) {
        cy.get('.oxd-select-text-input').first().click();
        cy.get('.oxd-select-dropdown').contains(role).click();
    }

    inputEmployeeName(name) {
        cy.get('.oxd-autocomplete-text-input input').type(name);
        cy.intercept('GET', `https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees?nameOrId=${name}`).as('getEmployee');
        cy.wait('@getEmployee').its('response.statusCode').should('eq', 200);
        cy.get('.oxd-autocomplete-option').first().click();
    }

    inputUsername(username) {
        cy.get('.oxd-input').eq(1).type(username);
    }

    clearUsernameField() {
        cy.get('.oxd-input').eq(1).clear();
    }

    selectStatus(status) {
        cy.get('.oxd-select-text-input').last().click();
        cy.get('.oxd-select-dropdown').contains(status).click();
    }

    inputPassword(password) {
        cy.get('.oxd-input[type="password"]').first().type(password);
    }

    confirmPassword(password) {
        cy.get('.oxd-input[type="password"]').last().type(password);
    }

    clickSaveButton() {
        cy.get('.oxd-button--secondary').click();
    }

    getRequiredFieldErrors() {
        return cy.get('.oxd-input-field-error-message');
    }

    getPasswordValidationError() {
        return cy.get('.oxd-input-field-error-message');
    }

    getUsernameValidationError() {
        return cy.get('.oxd-input-field-error-message').contains('Username');
    }

    getEmployeeName() {
        return cy.get('.oxd-autocomplete-text-input input');
    }

    getUsername() {
        return cy.get('.oxd-input').eq(1);
    }

    getPassword() {
        return cy.get('.oxd-input[type="password"]').first();
    }

    getConfirmPassword() {
        return cy.get('.oxd-input[type="password"]').last();
    }
}

export default new AddUserPage();
