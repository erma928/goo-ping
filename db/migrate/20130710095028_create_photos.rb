class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.references :actor, polymorphic: {default: 'User'}
      t.string :image
      t.string :title

      t.timestamps
    end
    add_index :photos, :actor_id
  end
end
