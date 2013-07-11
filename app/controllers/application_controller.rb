class ApplicationController < ActionController::Base
  protect_from_forgery
  before_filter :set_locale

  rescue_from CanCan::AccessDenied do |exception|
    redirect_to root_path, :alert => exception.message
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
  
  def default_url_options(options={})
    {locale: I18n.locale}
  end

end
