class Photo < ActiveRecord::Base
  belongs_to :imageable, polymorphic: true, inverse_of: :photos
  attr_accessible :image, :title
  attr_accessible :imageable_id, :imageable_type
  
  scope :recent, order("id DESC")

  # 封面图
  mount_uploader :image, PhotoUploader
end
