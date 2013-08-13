GooPing::Application.routes.draw do

  authenticated :user do
    root :to => 'home#index'
  end
  root :to => "home#index"
  
  resources :addresses
  resources :properties

  devise_for :users, :controllers => { 
      :registrations => 'registrations',
      :omniauth_callbacks => "users/omniauth_callbacks" 
  }
  
  get 'activity', to:'home#index', as: :activity
  
  get 'join_activity', to:'home#index', as: :join_activity
  get 'organize_activity', to:'home#index', as: :organize_activity
  get 'show_talent', to:'home#index', as: :show_talent
  get 'share_property', to:'home#index', as: :share_property
  
  get 'join_activity_intro', to:'home#join_activity_intro', as: :join_activity_intro
  get 'organize_activity_intro', to:'home#organize_activity_intro', as: :organize_activity_intro
  get 'show_talent_intro', to:'home#show_talent_intro', as: :show_talent_intro
  get 'share_property_intro', to:'home#share_property_intro', as: :share_property_intro

  get 'news_recreational_content', to:'home#index', as: :news_recreational_content
  get 'news_professional_content', to:'home#index', as: :news_professional_content
  get 'news_curriculum_content', to:'home#index', as: :news_curriculum_content
  
  get 'about_us', to:'home#index', as: :about_us
  get 'privileges', to:'home#index', as: :privileges
  get 'faqs', to:'home#index', as: :faqs
  get 'terms', to:'home#index', as: :terms
  get 'privacy_policy', to:'home#index', as: :privacy_policy
  get 'press', to:'home#index', as: :press
  get 'contact_us', to:'home#index', as: :contact_us
  get 'mobile', to:'home#index', as: :mobile

  resources :photos
  resources :users 
    
  resource :user do
    get 'verify_phone', to: :get_verify_phone
    post 'verify_phone', to: :verify_phone
    post 'send_verify_code'

    get 'dashboard'
    get 'property'
    get 'reservations'
    get 'account'
    get 'billing'
  end
end