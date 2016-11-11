require 'rails_helper'

RSpec.describe Trip, type: :model do
	describe "validations" do
		let(:user) {User.create(name: "John Doe")}
		let(:trip) {Trip.create(user_id: user.id, name: "Italy", center: "@41.2135431,8.0838555", zoom: 6)}

		it "has a name" do
			expect(trip.name).to eq "Italy"
		end

		it "is affiliated with a user" do
			expect(trip.user).to eq user
		end
	end
end
