class Property < ActiveRecord::Base
  attr_accessible :area, :indoor, :owner_status, :usage_status
  belongs_to :owner, polymorphic: true
  has_and_belongs_to_many :categories
  has_many :photos, as: :imageable
  has_many :feedbacks, as: :owner
  has_many :facilities
  has_one :address, as: :owner
  
end
