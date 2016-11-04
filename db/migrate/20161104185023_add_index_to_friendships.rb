class AddIndexToFriendships < ActiveRecord::Migration[5.0]
  def change
    add_index :friendships, [:friend1_id, :friend2_id], unique: true
  end
end
