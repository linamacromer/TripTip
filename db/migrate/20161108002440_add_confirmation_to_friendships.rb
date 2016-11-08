class AddConfirmationToFriendships < ActiveRecord::Migration[5.0]
  def change
    add_column :friendships, :confirmed, :boolean, default: false
  end
end
