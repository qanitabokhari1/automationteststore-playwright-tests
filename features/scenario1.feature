Feature: Complete E-commerce Flow

  Scenario: Login → Home → Select Dove Brand → Add Newest Item to Cart → Verify Cart
    Given I am logged in as "Qanita12" with password "Qanita123"
    When I navigate to the home page
    And I select the Dove brand from the carousel
    And I add the newest product to the cart
    Then I should see 1 item in the cart
