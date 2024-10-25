class SystemUsersPage {
    verifySystemUsersPage() {
        return cy.get('h5'); 
    }

    getUsersTable() {
        return cy.get('.oxd-table-row').get('.oxd-table-cell').find('div'); 
    }

    clickAddButton() {
        cy.get('.oxd-button--secondary').contains(' Add ').click(); 
    }

    searchForUser(username) {
        cy.get('.oxd-input').eq(1).type(username);
        cy.get('.oxd-button').contains('Search').click();
    }

    clickEditButton(username) {
        cy.contains(username).parents('.oxd-table-row').find('.bi-pencil-fill').click();
    }

    clickEditFirstUser() {
        cy.get('.oxd-table-row').eq(1).find('.bi-pencil-fill').click();
    }

    clickDeleteThirdUser() {
        cy.get('.oxd-table-row').eq(3).find('.bi-trash').click();
    }

    selectUserCheckbox(username) {
        cy.contains(username).parents('tr').find('input[type="checkbox"]').check();
    }

    clickDeleteButton() {
        cy.get('.oxd-button--label-danger').click(); 
    }

    getDeleteConfirmationDialog() {
        return cy.get('.orangehrm-dialog-popup');
    }

    confirmDeletion() {
        cy.get('.oxd-button--label-danger').contains('Yes').click();
    }

    cancelDeletion() {
        cy.get('.oxd-button--label-default').contains('No').click();
    }

    getSuccessMessage() {
        return cy.get('.oxd-toast-container');
    }

    getNoRecordsFoundMessage() {
        return cy.contains('No Records Found');
    }

    sortByUsername() {
        cy.get('.oxd-table-header-sort').eq(0).click(); 
    }

    verifyUsersSortedByUsername() {
    }

    verifyTableColumns() {
        cy.get('.oxd-table-header-cell').should(($columns) => {
            expect($columns.eq(1)).to.contain('Username');
            expect($columns.eq(2)).to.contain('User Role');
            expect($columns.eq(3)).to.contain('Employee Name');
            expect($columns.eq(4)).to.contain('Status');
        });
    }
    

    verifyMultiplePages() {
        cy.get('.oxd-pagination').should('be.visible'); // Adjust selector
    }

    navigateToNextPage() {
        cy.get('.oxd-pagination .next').click(); // Adjust selector
    }

    getAccessDeniedMessage() {
        return cy.contains('Access Denied');
    }

    buttonSearch() {
        return cy.get('[type="submit"]');
    }
}

export default new SystemUsersPage();
