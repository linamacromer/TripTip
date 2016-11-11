require 'rails_helper'

RSpec.describe User, type: :model do
	describe "validations" do
		let(:user) {User.create(name: "John Doe")}
		let(:trip) {Trip.create(user_id: user.id, name: "Italy", center: "@41.2135431,8.0838555,6z", zoom: "!3")}

		it"has a name" do
			expect(user.name).to eq "John Doe"
		end

		it  "has trips linked to it" do
			expect(user.trips).to eq([trip])
		end

	end
end
