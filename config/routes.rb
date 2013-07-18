GooPing::Application.routes.draw do


  authenticated :user do
    root :to => 'home#index'
  end
  root :to => "home#index"
  
  match ":locale" => "home#index"
  
  resources :addresses
  resources :properties

  devise_for :users, :controllers => { 
      :registrations => 'registrations',
      :omniauth_callbacks => "users/omniauth_callbacks" 
  }

  resources :photos
  resources :users
end