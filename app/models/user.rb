class User < ApplicationRecord
  has_many :trips
  has_many :tips, through: :trips
  has_many :friendships, :class_name => :Friendship, :foreign_key => "friend1_id"


  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_initialize.tap do |user|
      user.provider = auth.provider
      user.uid = auth.uid
      user.name = auth.info.name
      user.oauth_token = auth.credentials.token
      user.oauth_expires_at = Time.at(auth.credentials.expires_at)
      user.save!
    end
  end

  def friends
    friends = []
    Friendship.where("friend1_id = ? and confirmed = ?", self.id, true).each{|x|friends << x.friend2}
    Friendship.where("friend2_id = ? and confirmed = ?", self.id, true).each{|x|friends << x.friend1}
    return friends
  end

  def unconfirmed_friends
    friends = []
    Friendship.where("friend1_id = ? and confirmed = ?", self.id, false).each{|x|friends << x.friend2}
    return friends
  end

  def friend_requests
    friends = []
    Friendship.where("friend2_id = ? and confirmed = ?", self.id, false).each{|x|friends << x.friend1}
    return friends
  end



end
