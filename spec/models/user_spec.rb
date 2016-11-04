require 'rails_helper'

RSpec.describe User, type: :model do
	describe "validations" do
		let(:user) {User.create(name: "John Doe")}

		it"has a name" do
			expect(user.name).to eq "John Doe"
		end

	end
end
