# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :category do
    type 1
    name "MyString"
    description "MyString"
  end
end
