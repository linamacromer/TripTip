class UsersController < ApplicationController

  def index
  end

  def show
    render json: []
  end

  def search
    q = params[:q]
    if q != ""
      @user = User.find(session[:user_id])
      @friends = @user.friends
      @unconfirmed = @user.unconfirmed_friends
      @requests = @user.friend_requests
      query = "%#{q}%"
      results = User.where('lower(name) LIKE ?', query.downcase).all
      @users = []
      results.each do |x|
        @users << {:id => x.id, :name => x.name} if !@friends.include?(x) && x != @user && !@unconfirmed.include?(x) && !@requests.include?(x)
      end
      render json: @users
    end
  end

end
