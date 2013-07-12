class Facility < ActiveRecord::Base
  attr_accessible :description, :type
  belongs_to :property
  has_many :feedbacks, as: :owner
  
end
