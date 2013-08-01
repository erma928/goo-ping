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
  
  get 'join_activity_intro', to:'home#index', as: :join_activity_intro
  get 'organize_activity_intro', to:'home#index', as: :organize_activity_intro
  get 'show_talent_intro', to:'home#index', as: :show_talent_intro
  get 'share_property_intro', to:'home#index', as: :share_property_intro

  get 'news_recreational_content', to:'home#index', as: :news_recreational_content
  get 'news_professional_content', to:'home#index', as: :news_professional_content
  get 'news_curriculum_content', to:'home#index', as: :news_curriculum_content
  
  get 'user_dashboard', to:'home#index', as: :user_dashboard
  get 'user_property', to:'home#index', as: :user_property
  get 'user_reservations', to:'home#index', as: :user_reservations
  get 'user_account', to:'home#index', as: :user_account
  get 'user_billing', to:'home#index', as: :user_billing
  
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
end