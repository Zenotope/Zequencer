# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_08_12_194906) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "presets", force: :cascade do |t|
    t.string "name"
    t.text "grid", default: [], array: true
    t.integer "length"
    t.string "key"
    t.string "mode"
    t.integer "octave"
    t.integer "tempo"
    t.string "sound"
    t.integer "volume"
    t.boolean "delay"
    t.integer "delayamt"
    t.boolean "dist"
    t.integer "distamt"
    t.boolean "reverb"
    t.integer "reverbamt"
    t.integer "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "sub"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end
