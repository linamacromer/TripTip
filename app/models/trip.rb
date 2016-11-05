class Trip < ApplicationRecord
  belongs_to :user
  has_many :tips

  validates :name, :center, :zoom, presence: true

end
