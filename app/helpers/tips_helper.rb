module TipsHelper

  def format_rating

    if @tip.rating == nil
      rating = "You have not rated this location yet"
    else
      rating = @tip.rating.to_s
    end

    @user.name.split.first + "'s Rating: "
  end

  def format_comment

    if @tip.comment == nil
      ""
    else
      @tip.comment
    end

  end

  def user_owned
    @current_user == @user.id
  end

end