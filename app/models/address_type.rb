class AddressType < ActiveRecord::Base
  attr_accessible :active, :name, :updated_by
  belongs_to :user, foreign_key: 'updated_by'
end
