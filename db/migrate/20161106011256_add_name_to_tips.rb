class AddNameToTips < ActiveRecord::Migration[5.0]
  def change
    add_column :tips, :name, :string
  end
end
