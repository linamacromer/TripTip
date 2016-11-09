Rails.application.routes.draw do

  get 'auth/:provider/callback', to: 'sessions#create'
  get 'auth/failure', to: redirect('/')
  get 'signout', to: 'sessions#destroy', as: 'signout'

  resources :sessions, only: [:create, :destroy]
  resource :home, only: [:show]
  resources :users, only: [:show, :search] do
    resources :trips, only: [:index, :show, :new, :create, :update, :destroy] do
      resources :tips, only: [:index, :show, :new, :create, :update, :destroy]
    end
  end

  scope :users do
    get 'search/:q' => 'users#search'
    post ':id/friends' => 'friendships#create'
    get ':id/friends/pending' => 'friendships#pending'
    put ':id/friends/:friend_id' => 'friendships#confirm'
    delete ':id/friends/:friend_id' => 'friendships#destroy'
  end

  root to: "home#show"

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
