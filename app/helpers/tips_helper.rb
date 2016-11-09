module TipsHelper

  def format_rating

    if @tip.rating == nil
      rating = "You have not rated this location yet"
    else
      rating = @tip.rating.to_s
    end

    @user.name.split.first + "'s Rating: " + rating
  end

  def format_comment

    if @tip.comment == nil
      "There are no comments yet"
    else
      @tip.comment
    end

  end

end