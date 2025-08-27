Feature: T-shirts and Shoes Shopping Flow

  Scenario: Login → Apparel → T-shirts → Sort Low to High → Select Lowest → Shoes → Sort High to Low → Add Highest (Qty: 2) → Verify Cart
    Given I am logged in as "sharjeel" with password "ahmad12"
    When I navigate to the APPAREL & ACCESSORIES section
    And I navigate to the T-shirts section
    And I sort T-shirts by low to high price
    And I select the lowest value T-shirt product
    And I go back to APPAREL & ACCESSORIES section
    And I navigate to Shoes section and add highest value product with quantity 2
    Then I should see the cart contains both T-shirt and shoe items
