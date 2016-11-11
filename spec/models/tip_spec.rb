require 'rails_helper'

RSpec.describe Tip, type: :model do
	describe "validations" do
		let(:user) {User.create(name: "John Doe")}
		let(:trip) {Trip.create(user_id: user.id, name: "Italy", center: "@41.2135431,8.0838555,6z", zoom: "!3")}
		let(:tip) {trip.tips.create(place_id: "ChIJrTLr-GyuEmsRBfy61i59si0")}

		it "has a place ID" do
			expect(tip.place_id).to eq "ChIJrTLr-GyuEmsRBfy61i59si0"
		end

		it "is affiliated with a user" do
		    expect(tip.trip.user).to eq user
		end
	end
end
