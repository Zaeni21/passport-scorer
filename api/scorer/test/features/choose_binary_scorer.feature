Feature: Select Binary Scorer
  As a user

  Scenario: As a developer, I want to choose the Gitcoin Binary Community Score
    Given that I select the Gitcoin Binary Community Score as an option
    When the selection takes effect
    Then it automatically becomes the new rule in the respective community
