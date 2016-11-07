class TipsController < ApplicationController
	def index
    @user = User.find_by(id: params[:user_id])
    @trip = @user.trips.find_by(id: params[:trip_id])
    render :index, :layout => false
	end

	def show
		@tip = Tip.find(params[:id])
		respond_to do |format|
			format.html { render }
			format.json { render json: @tip }
		end
	end

	def create
		@trip = Trip.find(params[:trip_id])
		@tip = @trip.tips.create(tip_params)

		respond_to do |format|
			format.html { render }
			format.json { render json: @tip }
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
		params.require(:tip).permit( :place_id, :rating, :comment )
	end

end
