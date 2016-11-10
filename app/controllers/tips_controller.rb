class TipsController < ApplicationController
	def index
		@user_id = session[:user_id]
    @user = User.find_by(id: params[:user_id])
    @trip = @user.trips.find_by(id: params[:trip_id])
    @tips = @trip.tips.as_json

    @tips.each do |tip|
      tip["user_id"] = @user.id
      tip["username"] = @user.name.split.first
    end
 
    respond_to do |format|
      format.html { render :index, :layout => false }
      format.json { render json: @tips }
    end
  end

  def show
    @user = User.find_by(id: params[:user_id])
    @trip = @user.trips.find_by(id: params[:trip_id])
    @tip = @trip.tips.find_by(id: params[:id])

    @tip_json = @tip.as_json
    @tip_json["user_id"] = @user.id
    @tip_json["username"] = @user.name.split.first

    respond_to do |format|
      format.html { render :show, :layout => false }
      format.json { render json: @tip_json }
		end
	end

	def create
		@user = User.find_by(id: params[:user_id])
    @trip = @user.trips.find_by(id: params[:trip_id])
    @tip = @trip.tips.create(tip_params)

    if @tip.save
      redirect_to user_trip_tip_path(@user,@trip,@tip)
    else
      render json: @tip.errors, status: :unprocessable_entity
    end
	end

	def update
		@user = User.find_by(id: params[:user_id])
    @trip = @user.trips.find_by(id: params[:trip_id])
    @tip = @trip.tips.find_by(id: params[:id])
		@tip.update_attributes(tip_params)

    if @tip.save
      render :show, :layout => false
    else
      render json: @tip.errors, status: :unprocessable_entity
    end
	end

	def destroy
		Tip.destroy(params[:id])
	end

	private

	def tip_params
		params.require(:tip).permit( :name, :place_id, :rating, :comment, :lat, :lng, :address, :g_rating )
	end

end
