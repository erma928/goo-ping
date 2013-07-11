class Feedback < ActiveRecord::Base
  belongs_to :owner, polymorphic: true
  belongs_to :provider
  attr_accessible :comments, :rating
end
