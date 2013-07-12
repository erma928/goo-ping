class Address < ActiveRecord::Base
  attr_accessible :city, :line1, :line2, :postal_code, :state_or_province, :updated_by
  belongs_to :address_type
  belongs_to :owner, polymorphic: true
  belongs_to :user, foreign_key: 'updated_by'
end
