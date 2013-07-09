GooPing::Application.routes.draw do
  authenticated :user do
    root :to => 'home#index'
  end
  root :to => "home#index"
  
  match ":locale" => "home#index"
  
  scope "(:locale)" do
    devise_for :users, :controllers => { 
        :registrations => 'registrations',
        :omniauth_callbacks => "users/omniauth_callbacks" 
    }
  
    resources :users
  end
end