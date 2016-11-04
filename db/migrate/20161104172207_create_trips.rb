class CreateTrips < ActiveRecord::Migration[5.0]
  def change
    create_table :trips do |t|
      t.integer :user_id, null: false, foreign_key: true
      t.string :name, null: false
      t.string :center, null: false
      t.integer :zoom, null: false

      t.timestamps
    end
  end
end
