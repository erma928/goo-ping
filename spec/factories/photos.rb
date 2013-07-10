# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :photo do
    actor nil
    image "MyString"
    title "MyString"
  end
end
