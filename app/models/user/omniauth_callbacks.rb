# coding: utf-8
class User
  module OmniauthCallbacks
    ["github","google","twitter","douban"].each do |provider|
      define_method "find_or_create_for_#{provider}" do |response|
        uid = response["uid"]
        data = response["info"]

        if user = User.includes(:omniauth_services).where("omniauth_services.provider" => provider , "omniauth_services.uid" => uid).first
          user
        else
          user = User.new_from_provider_data(provider, uid, data)
          user.skip_confirmation!
          if user.save(:validate => false)
            user.omniauth_services << OmniauthService.new(:provider => provider, :uid => uid )
            user.confirm!
            return user
          else
            Rails.logger.warn("User.create_from_hash 失败，#{user.errors.inspect}")
            return nil
          end
        end
      end
    end

    def new_from_provider_data(provider, uid, data)
      User.new do |user|
        if data["email"].present? && !User.where(:email => data["email"]).exists?
          user.email = data["email"]
        else
          user.email = "#{provider}+#{uid}@example.com"
        end
        user.name = data['name']

        user.password = Devise.friendly_token[0, 20]
      end
    end
  end
end