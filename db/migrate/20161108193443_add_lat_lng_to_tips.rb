class AddLatLngToTips < ActiveRecord::Migration[5.0]
  def change
    add_column :tips, :lat, :decimal
    add_column :tips, :lng, :decimal
  end
end
