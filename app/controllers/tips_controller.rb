class TipsController < ApplicationController
	def index
		@user_id = session[:user_id]
    @user = User.find_by(id: params[:user_id])
    @trip = @user.trips.find_by(id: params[:trip_id])
 
    respond_to do |format|
			format.html { render :index, :layout => false }
			format.json { render json: @trip.tips }
		end
	end

	def show
		@tip = Tip.find(params[:id])
		respond_to do |format|
			format.html { render }
			format.json { render json: @tip }
		end
	end

	def create
		@user = User.find_by(id: params[:user_id])
    @trip = @user.trips.find_by(id: params[:trip_id])
    @tip = @trip.tips.create(tip_params)

    if @tip.save
      render :show, :layout => false , status: :created
    else
      render json: @tip.errors, status: :unprocessable_entity
    end
	end

	def update
		@tip = Tip.find(params[:id])
		@tip.update_attributes(tip_params)

		respond_to do |format|
			format.html { render }
			format.json { render json: @tip }
		end
	end

	def destroy
		Tip.destroy(params[:id])
	end

	private

	def tip_params
		params.require(:tip).permit( :name, :place_id, :rating, :comment, :lat, :lng )
	end

end
