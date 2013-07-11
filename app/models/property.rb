class Property < ActiveRecord::Base
  belongs_to :owner, polymorphic: true
  attr_accessible :area, :indoor, :owner_status, :usage_status
end
