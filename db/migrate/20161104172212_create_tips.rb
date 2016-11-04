class CreateTips < ActiveRecord::Migration[5.0]
  def change
    create_table :tips do |t|
      t.integer :trip_id, null: false
      t.string :place_id, null: false
      t.integer :rating
      t.string :comment

      t.timestamps
    end
  end
end
