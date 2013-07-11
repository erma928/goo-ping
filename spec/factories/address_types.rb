# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :address_type do
    name "MyString"
    active false
    updated_by 1
  end
end
