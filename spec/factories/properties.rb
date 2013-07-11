# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :property do
    indoor false
    area "9.99"
    owner nil
    owner_status 1
    usage_status 1
  end
end
