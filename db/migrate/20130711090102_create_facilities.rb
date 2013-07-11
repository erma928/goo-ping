class CreateFacilities < ActiveRecord::Migration
  def change
    create_table :facilities do |t|
      t.integer :type
      t.references :property
      t.string :description

      t.timestamps
    end
    add_index :facilities, :property_id
  end
end
