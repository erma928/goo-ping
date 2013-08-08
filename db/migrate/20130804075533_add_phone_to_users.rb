class AddPhoneToUsers < ActiveRecord::Migration
  def change
    add_column :users, :phone, :string
    add_column :users, :phone_verification_code, :string
  end
end
