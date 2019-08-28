Feature: Currency and Exchange api smoketest

  Scenario: Test currency service
    Given Get all currencies as user
    And Create and delete currency as admin
    And Get currency by id 510 as user

  Scenario: Test exchange service
    Given Do exchange of 15 from currency id 86 to currency id 87 as user