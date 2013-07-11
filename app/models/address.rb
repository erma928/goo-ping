class Address < ActiveRecord::Base
  belongs_to :address_type
  belongs_to :owner, polymorphic: true
  attr_accessible :city, :line1, :line2, :postal_code, :state_or_province, :updated_by
end
