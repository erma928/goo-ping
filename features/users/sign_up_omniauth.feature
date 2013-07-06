Feature:
	In order to get access to protected sections of the site
	As a OmniAuth service user
	I want to be able to sign up
	
	Background:
		Given I am not logged in
		And I click "Sign Up with QQ" to login with OmniAuth service
		And OmniAuth service returns logged in success message
		
	Scenario: User signs up with valid data
		When OmniAuth service returns an email address new to the system
		And I sign up with valid user data
		Then I should see a successful sign up message
		
	Scenario: User has already signed up 
		When OmniAuth service returns an email address existed in the system
		Then I should see a successful sign up message
		