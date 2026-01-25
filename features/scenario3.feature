Feature: Skincare Section Testing with XPath Selectors

  Scenario: Home → Skincare Section → Count Sale/Out of Stock Items → Add Sale Items to Cart → Verify Cart
    Given I am logged in as "Qanita12" with password "Qanita123"
    When I navigate to the skincare section
    And I count sale and out of stock items
    And I add available sale items to the cart
    Then I should see the cart contains the added sale items
