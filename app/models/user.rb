class User < ActiveRecord::Base
  extend OmniauthCallbacks
  
  rolify
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable
  devise :invitable, :database_authenticatable, :registerable, :confirmable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauthable

  has_many :omniauth_services, dependent: :destroy
  has_many :photos, as: :imageable
  has_many :properties, as: :owner
  has_many :feedbacks, as: :owner
  
  # Setup accessible (or protected) attributes for your model
  attr_accessible :role_ids, :as => :admin
  attr_accessible :name, :email, :password, :password_confirmation, :remember_me
  attr_accessible :photos_attributes
  
  accepts_nested_attributes_for :photos

  # add auth to already signed in user
  def bind_service(response)
    provider = response["provider"]
    uid = response["uid"]
    omniauth_services.create(provider: provider, uid: uid)
  end
    
end
