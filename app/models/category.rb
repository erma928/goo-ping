class Category < ActiveRecord::Base
  attr_accessible :description, :name, :type
  has_and_belongs_to_many :properties
  
end
