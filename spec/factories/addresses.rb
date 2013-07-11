# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :address do
    address_type nil
    line1 "MyString"
    line2 "MyString"
    city "MyString"
    state_or_province "MyString"
    postal_code "MyString"
    updated_by 1
    owner nil
  end
end
