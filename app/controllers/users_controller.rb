class UsersController < ApplicationController

  def index
  end

  def show

  end

  def search
    @results = User.where('name LIKE ?', '%%').all
  end

end
