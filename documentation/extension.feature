Feature: Intercept detected phishing sites
    In order to browse the internet safely
    As a user
    I want to be redirected when targeted by phishing sites

Scenario: The user should be redirected when detected to be on a phishing site
    Given a URL 
        And URL is determined to be a phishing site
    Then I should see an alert message
        And redirected to the correct site