class Tip < ApplicationRecord
  belongs_to :trip
  validates_uniqueness_of :place_id, scope: :trip_id, message: "Trip already contains location"

end
