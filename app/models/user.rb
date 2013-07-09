class User < ActiveRecord::Base
  extend OmniauthCallbacks
  
  rolify
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable
  devise :invitable, :database_authenticatable, :registerable, :confirmable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauthable

  has_many :omniauth_services, dependent: :destroy
  
  # Setup accessible (or protected) attributes for your model
  attr_accessible :role_ids, :as => :admin
  attr_accessible :name, :email, :password, :password_confirmation, :remember_me

  # add auth to already signed in user
  def bind_service(response)
    provider = response["provider"]
    uid = response["uid"]
    omniauth_services.create(provider: provider, uid: uid)
  end
    
end
