require 'rails_helper'

RSpec.feature "User adds a new trip", type: :feature do
  scenario "User creates a new trip" do

    visit user_path(1)
    p user_path(1)
    fill_in "Password", :with => ENV["ADMIN_PASSWORD"]
    click_button "Submit"

    visit new_competitor_path

    fill_in "Name", :with => "John Doe"
    click_button "Submit"

    expect(page).to have_text("Welcome")
  end
end