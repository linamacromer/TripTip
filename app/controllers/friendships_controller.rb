class FriendshipsController < ActionController::Base
  def create
    user = User.find(params[:id])
    friend = User.find_by(name: params[:name])
    request = Friendship.new(friend1: user, friend2: friend)
    if request.save
      render json: user
    end
  end

  def pending
    user = User.find(params[:id])
    render json: user.friend_requests
  end

  def confirm
    friendship = Friendship.find_by(friend1: params[:friend_id], friend2: params[:id])
    friendship.confirmed = true
    friendship.save
    render json: {friend: friendship.friend1, trips: friendship.friend1.trips}
  end

  private

  def friendship_params
      params.require(:name)
  end
end
