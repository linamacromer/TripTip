require 'spec_helper'

describe "Trip Controller" do
  let(:user){
    User.create!(valid_attributes)
  }

  let(:valid_attributes){
    {
      provider: 'google',
      uid: 1234567890,
      name: 'John Doe',
      oauth_token: '678546w5estfchgvjhbk'
      oauth_expires_at: 5.days.from_now

    }
  }

  describe "" do
    user
    context 'with invalid credentials' do
      it "redisplay login with error" do
        post '/login', invalid_credentials
        expect(last_response.body).to include('Username or password was incorrect!')
      end
      it "doesn't log user in" do
        post '/login', invalid_credentials
        expect(last_request.env['rack.session'][:user_id]).to be_nil
      end
    end
    
    context 'with valid credentials' do
      it "redirect to user profile" do
        post '/login', valid_credentials
        expect(last_response).to be_redirect
      end
      it "associates user with session" do
        post '/login', valid_credentials
        expect(last_request.env['rack.session'][:user_id]).to eq(existing_user.id)
      end
    end
  end
end