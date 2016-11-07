require 'faker'

puts "***Did you remember to db:drop, then db:create, db:migrate, then log in through OAuth? If not, start over***"

10.times do
  user = User.create(name: Faker::Name.name)
  user.friendships.create(friend2_id: 1)
end

trip = Trip.create( user_id: 2, name: "NYC", center: "40.7591704 -74.039271", zoom: 12)
3.times do
	trip.tips.create(place_id: "placeholder", name: Faker::Company.name)
end

trip = Trip.create( user_id: 2, name: "Japan", center: "35.6754931 139.65785059", zoom: 12)
3.times do
	trip.tips.create(place_id: "placeholder", name: Faker::Company.name)
end

trip = Trip.create( user_id: 2, name: "Maui", center: "20.8112164 -156.5052389", zoom: 11)
3.times do
	trip.tips.create(place_id: "placeholder", name: Faker::Company.name)
end

trip = Trip.create( user_id: 3, name: "Omaha", center: "41.2471321 -96.0254671", zoom: 13)
3.times do
	trip.tips.create(place_id: "placeholder", name: Faker::Company.name)
end

trip = Trip.create( user_id: 3, name: "Thailand", center: "13.0110421 96.9927933", zoom: 6 )
3.times do
	trip.tips.create(place_id: "placeholder", name: Faker::Company.name)
end

trip = Trip.create( user_id: 3, name: "Morocco", center: "31.4959442 -9.3713982", zoom: 7 )
3.times do
	trip.tips.create(place_id: "placeholder", name: Faker::Company.name)
end

trip = Trip.create( user_id: 4, name: "Madrid", center: "40.4381311 -3.9596966", zoom: 10 )
3.times do
	trip.tips.create(place_id: "placeholder", name: Faker::Company.name)
end

trip = Trip.create( user_id: 4, name: "Beijing", center: "39.9259513 116.073226", zoom: 10 )
3.times do
	trip.tips.create(place_id: "placeholder", name: Faker::Company.name)
end

trip = Trip.create( user_id: 4, name: "Athens", center: "38.0758527 23.4091295", zoom: 10 )
3.times do
	trip.tips.create(place_id: "placeholder", name: Faker::Company.name)
end

trip = Trip.create( user_id: 5, name: "Switzerland", center: "46.6745631 5.882451", zoom: 7 )
3.times do
	trip.tips.create(place_id: "placeholder", name: Faker::Company.name)
end

trip = Trip.create( user_id: 5, name: "Prague", center: "50.0597733 14.3255194", zoom: 11 )
3.times do
	trip.tips.create(place_id: "placeholder", name: Faker::Company.name)
end

trip = Trip.create( user_id: 5, name: "Moscow", center: "55.7498597 37.3523182", zoom: 10 )
3.times do
	trip.tips.create(place_id: "placeholder", name: Faker::Company.name)
end

trip = Trip.create( user_id: 6, name: "Denver", center: "39.76453 -104.9952216", zoom: 11 )
3.times do
	trip.tips.create(place_id: "placeholder", name: Faker::Company.name)
end

trip = Trip.create( user_id: 6, name: "Disneyland", center: "33.8120962 -117.9211629", zoom: 17 )
3.times do
	trip.tips.create(place_id: "placeholder", name: Faker::Company.name)
end

trip = Trip.create( user_id: 6, name: "Victoria BC", center: "48.4252787 -123.3806468", zoom: 14 )
3.times do
	trip.tips.create(place_id: "placeholder", name: Faker::Company.name)
end

trip = Trip.create( user_id: 7, name: "Panama", center: "8.4108388 -82.361796", zoom: 7 )
3.times do
	trip.tips.create(place_id: "placeholder", name: Faker::Company.name)
end

trip = Trip.create( user_id: 7, name: "Dubai", center: "25.1044001 55.1290653", zoom: 11 )
3.times do
	trip.tips.create(place_id: "placeholder", name: Faker::Company.name)
end

trip = Trip.create( user_id: 7, name: "Iceland", center: "64.671339 -21.2243514", zoom: 7 )
3.times do
	trip.tips.create(place_id: "placeholder", name: Faker::Company.name)
end

trip = Trip.create( user_id: 8, name: "Ireland", center: "53.4098032 -10.5745431", zoom: 7 )
3.times do
	trip.tips.create(place_id: "placeholder", name: Faker::Company.name)
end

trip = Trip.create( user_id: 8, name: "Auckland", center: "-36.8682994 174.5577255", zoom: 10 )
3.times do
	trip.tips.create(place_id: "placeholder", name: Faker::Company.name)
end

trip = Trip.create( user_id: 8, name: "Zimbabwe", center: "-18.9518356 26.8984329", zoom: 7 )
3.times do
	trip.tips.create(place_id: "placeholder", name: Faker::Company.name)
end

trip = Trip.create( user_id: 9, name: "Sydney", center: "-33.8458825 150.6516889", zoom: 10 )
3.times do
	trip.tips.create(place_id: "placeholder", name: Faker::Company.name)
end

trip = Trip.create( user_id: 9, name: "Austin", center: "30.3080553 -97.8935156", zoom: 11 )
3.times do
	trip.tips.create(place_id: "placeholder", name: Faker::Company.name)
end

trip = Trip.create( user_id: 9, name: "Chicago", center: "41.8252064 -87.8187062", zoom: 11 )
3.times do
	trip.tips.create(place_id: "placeholder", name: Faker::Company.name)
end

trip = Trip.create( user_id: 10, name: "San Fransisco", center: "37.7578885 -122.5076467", zoom: 12 )
3.times do
	trip.tips.create(place_id: "placeholder", name: Faker::Company.name)
end

trip = Trip.create( user_id: 10, name: "LA", center: "34.0207504 -118.6919209", zoom: 10 )
3.times do
	trip.tips.create(place_id: "placeholder", name: Faker::Company.name)
end

trip = Trip.create( user_id: 10, name: "Seattle", center: "47.6149943 -122.4759893", zoom: 11 )
3.times do
	trip.tips.create(place_id: "placeholder", name: Faker::Company.name)
end

trip = Trip.create( user_id: 11, name: "Philadelphia", center: "39.9415235 -75.1728016", zoom: 13)
3.times do
	trip.tips.create(place_id: "placeholder", name: Faker::Company.name)
end

trip = Trip.create( user_id: 11, name: "Italy", center: "42.1733409 11.4456719", zoom: 7)
3.times do
	trip.tips.create(place_id: "placeholder", name: Faker::Company.name)
end

trip = Trip.create( user_id: 11, name: "San Diego", center: "32.7116516 -117.1944211", zoom: 13)
3.times do
	trip.tips.create(place_id: "placeholder", name: Faker::Company.name)
end




User.create(name: Faker::Name.name)

trip = Trip.create( user_id: 12, name: "Bermuda Triangle", center: "24.8339412 -71.5727022,", zoom: 9)
trip.tips.create(place_id: "placeholder", name: "Shipwreck...")