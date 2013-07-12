class Feedback < ActiveRecord::Base
  attr_accessible :comments, :rating
  belongs_to :owner, polymorphic: true
  belongs_to :user, foreign_key: 'provider_id'
  
end
