class CreateFeedbacks < ActiveRecord::Migration
  def change
    create_table :feedbacks do |t|
      t.decimal :rating
      t.text :comments
      t.references :owner, polymorphic: true
      t.references :provider

      t.timestamps
    end
    add_index :feedbacks, :owner_id
    add_index :feedbacks, :provider_id
  end
end
