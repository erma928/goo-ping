class HomeController < ApplicationController
  def index
    @featured_activities = Array.new
    
    10.times do
      @featured_activities << Activity.new
    end
  
  end
end

class Activity
  def thumb_url
    "renter-icon.png"
  end
  def price_tag
    "$12"
  end
  def title
    "Optical Valley coffee open"
  end
  def address
    "500 Dover Road"
  end
  
end