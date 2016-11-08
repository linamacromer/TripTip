require 'rails_helper'

RSpec.describe Friendship, type: :model do
	describe "validations" do
		let(:user1) {User.create(name: "John Doe")}
		let(:user2) {User.create(name: "Jane Smith")}
		let(:friendship) {Friendship.create(friend1: user1, friend2: user2, confirmed: true)}

		it"has a friendship" do
			friendship.save
			expect(user1.friends).to eq [user2]
		end

	end
end
