Feature: Men Section Testing with XPath Selectors

  Scenario: Home → Men Section → Add Product Ending with M to Cart → Verify Cart Item Ends with M
    Given I am logged in as "sharjeel" with password "ahmad12"
    When I navigate to the men section
    And I find and add a product ending with M to the cart
    Then I should see the cart contains the product ending with M
