class CreateFriendships < ActiveRecord::Migration[5.0]
  def change
    create_table :friendships do |t|
      t.integer :friend1_id, null: false
      t.integer :friend2_id, null: false

      t.timestamps
    end
  end
end
