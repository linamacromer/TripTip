class AddAddressToDb < ActiveRecord::Migration[5.0]
  def change
    add_column :tips, :address, :string
  end
end
