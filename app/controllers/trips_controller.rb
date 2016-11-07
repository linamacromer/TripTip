class TripsController < ApplicationController

  def index
    @user = User.find_by(id: params[:user_id])
    @trips = @user.trips if @user
    render json: @trips, status: :created
  end

  def show
    @user = User.find_by(id: params[:user_id])
    @trip = @user.trips.find_by(id: params[:id]) if @user
    render json: @trip, status: :created
  end

  def create
    @user = User.find_by(id: params[:user_id])
    @trip = @user.trips.create(trip_params)

    if @trip.save
      render json: @trip, status: :created
    else
      render json: @trip.errors, status: :unprocessable_entity
    end
  end

  def update
    p "---------------------------------"
    @trip = Trip.find(params[:id])
    p @trip
    p "---------------------------------"
  end

  def destroy
    Trip.destroy(params[:id])
  end

  private

  def trip_params
    params.require(:trip).permit( :name, :center, :zoom, :private)
  end

end
