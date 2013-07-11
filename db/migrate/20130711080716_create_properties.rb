class CreateProperties < ActiveRecord::Migration
  def change
    create_table :properties do |t|
      t.boolean :indoor
      t.decimal :area
      t.references :owner, polymorphic: true
      t.integer :owner_status
      t.integer :usage_status

      t.timestamps
    end
    add_index :properties, :owner_id
  end
end
