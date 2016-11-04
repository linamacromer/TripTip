require 'rails_helper'

RSpec.feature "Admin adds new competitor", type: :feature do
  scenario "Admin adds new competitor" do

    # Needs to be an admin
    visit login_path
    fill_in "Password", :with => ENV["ADMIN_PASSWORD"]
    click_button "Submit"

    visit new_competitor_path

    fill_in "Name", :with => "John Doe"
    click_button "Submit"

    expect(page).to have_text("Welcome")
  end
end