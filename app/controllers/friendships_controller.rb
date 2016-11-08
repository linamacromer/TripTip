class FriendshipsController < ActionController::Base
  def create
    @user = params[:user_id]
    @friend = params[:id]
    ship = Friendship.new(friend1 = @user, friend2 = @friend)
    if ship.save
      render json: true
    end
  end
end
