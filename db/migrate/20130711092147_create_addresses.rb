class CreateAddresses < ActiveRecord::Migration
  def change
    create_table :addresses do |t|
      t.references :address_type
      t.string :line1
      t.string :line2
      t.string :city
      t.string :state_or_province
      t.string :postal_code
      t.integer :updated_by
      t.references :owner, polymorphic: true

      t.timestamps
    end
    add_index :addresses, :address_type_id
    add_index :addresses, :owner_id
  end
end
