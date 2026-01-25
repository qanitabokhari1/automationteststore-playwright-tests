Feature: SauceDemo Login - Valid Credentials

  Scenario: Login with valid credentials
    Given I navigate to the SauceDemo login page
    When I enter valid username "standard_user"
    And I enter valid password "secret_sauce"
    And I click sign in
    Then I should land on the dashboard
