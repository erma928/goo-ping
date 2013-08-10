class ApplicationController < ActionController::Base
  protect_from_forgery
  before_filter :set_locale

  rescue_from CanCan::AccessDenied do |exception|
    # reaction for custom action and subject
    if exception.action == :dashboard 
      redirect_to verify_phone_user_path
    else
      redirect_to root_path, :alert => exception.message
    end
  end
  
  protected
  
  # set locale if params[:locale] has a value
  def set_locale
    if params[:set_locale]
      if I18n.available_locales.include?(params[:set_locale].to_sym)
        I18n.locale = params[:set_locale]
      else
        flash.now[:notice] = "#{params[:set_locale]} translations not available"
        logger.error flash.now[:notice]
      end
    end
  end
  
end
