class UsersController < ApplicationController
  def index
  end

  def show
  end

  def search
    User.where('name LIKE ?', '%%').all
  end

end
