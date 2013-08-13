class HomeController < ApplicationController
  layout :resolve_layout
  
  def index
    @featured_activities = Array.new
    10.times do
      @featured_activities << Activity.new
    end
  end
  
  def join_activity_intro; end
  
  def organize_activity_intro; end
  
  def show_talent_intro; end
  
  def share_property_intro; end
  
  private
  
  def resolve_layout
    action_name.include?("_intro")? 'intro': 'application'
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