class Facility < ActiveRecord::Base
  belongs_to :property
  attr_accessible :description, :type
end
