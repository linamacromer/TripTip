class AddPrivateToTrips < ActiveRecord::Migration[5.0]
  def change
    add_column :trips, :private, :boolean, default: false
  end
end
