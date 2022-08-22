class CreatePresets < ActiveRecord::Migration[6.1]
  def change
    create_table :presets do |t|
      t.string :name
      t.text :grid, array: true, default: [] 
      t.integer :length
      t.string :key
      t.string :mode
      t.integer :octave
      t.integer :tempo
      t.string :sound
      t.integer :volume
      t.boolean :delay
      t.integer :delayamt
      t.boolean :dist
      t.integer :distamt
      t.boolean :reverb
      t.integer :reverbamt
      t.integer :user_id

      t.timestamps
    end
  end
end
