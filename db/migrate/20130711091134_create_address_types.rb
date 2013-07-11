class CreateAddressTypes < ActiveRecord::Migration
  def change
    create_table :address_types do |t|
      t.string :name
      t.boolean :active
      t.integer :updated_by

      t.timestamps
    end
  end
end
