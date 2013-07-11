# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :feedback do
    rating "9.99"
    comments "MyText"
    owner nil
    provider nil
  end
end
