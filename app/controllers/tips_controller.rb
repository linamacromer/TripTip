class TipsController < ApplicationController
	def index
		@trip = Trip.find(params[:trip_id])
		@tips = @trip.tips

		respond_to do |format|
			format.html { render }
			format.json { render json: @tips }
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
