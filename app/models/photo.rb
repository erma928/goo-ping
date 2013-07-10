class Photo < ActiveRecord::Base
  belongs_to :actor, polymorphic: true
  attr_accessible :image, :title
  
  scope :recent, order("id DESC")

  # 封面图
  mount_uploader :image, PhotoUploader
end
