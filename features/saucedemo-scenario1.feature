Feature: SauceDemo Login - Invalid Password

  Scenario: Login with invalid password
    Given I navigate to the SauceDemo login page
    When I enter valid username "standard_user"
    And I enter invalid password "wrong_password"
    And I click sign in
    Then I should see an error message
