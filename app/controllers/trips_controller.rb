class TripsController < ApplicationController

  def show
    @user = User.find_by(id: params[:user_id])

    respond_to do |format|
      if @trip.save
        format.json { render json: @trip, status: :created} 
      else
        format.json { render json: @trip.errors, status: :unprocessable_entity }
      end
    end

  end

  def create
    @user = User.find_by(id: params[:user_id])
    @trip = @user.trips.new(trip_params)
    
    respond_to do |format|
      if @trip.save
        format.json { render json: @trip, status: :created} 
      else
        format.json { render json: @trip.errors, status: :unprocessable_entity }
      end
    end

  end

  private

  def trip_params
    params.require(:trip).permit( :name, :center, :zoom )
  end

end