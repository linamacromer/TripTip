class AddRatingToDb < ActiveRecord::Migration[5.0]
  def change
    add_column :tips, :g_rating, :float
  end
end
