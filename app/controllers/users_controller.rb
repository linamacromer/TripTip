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
      query = "%#{q}%"
      results = User.where('name LIKE ?', query).all
      @users = []
      results.each do |x|
        @users << {:id => x.id, :name => x.name} if !@friends.include?(x) && x != @user
      end
      render json: @users
    end
  end

end
