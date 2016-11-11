require 'rails_helper'

RSpec.describe Friendship, type: :model do
	describe "validations" do
		let(:user1) {User.create(name: "John Doe")}
		let(:user2) {User.create(name: "Jane Smith")}
		let(:friendship) {Friendship.create(friend1: user1, friend2: user2)}

		it "has unconfirmed friendships" do
			friendship.save
			expect(user1.unconfirmed_friends).to eq [user2]
		end

		it "has requests pending" do
			friendship.save
			expect(user2.friend_requests).to eq [user1]
		end

		it "has friends" do
			friendship.confirmed = true
			friendship.save
			expect(user1.friends).to eq [user2]
		end


	end
end
