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

ActiveRecord::Schema[7.1].define(version: 2025_11_19_061734) do
  create_table "job_seeker_job_types", charset: "utf8mb4", collation: "utf8mb4_general_ci", force: :cascade do |t|
    t.bigint "job_seeker_id", null: false
    t.bigint "job_type_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["job_seeker_id"], name: "index_job_seeker_job_types_on_job_seeker_id"
    t.index ["job_type_id"], name: "index_job_seeker_job_types_on_job_type_id"
  end

  create_table "job_seekers", charset: "utf8mb4", collation: "utf8mb4_general_ci", force: :cascade do |t|
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.boolean "allow_password_change", default: false
    t.datetime "remember_created_at"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.string "image"
    t.string "email"
    t.text "tokens"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "first_name"
    t.string "last_name"
    t.string "gender"
    t.string "birth_date"
    t.string "self_introduction"
    t.bigint "prefecture_id"
    t.index ["confirmation_token"], name: "index_job_seekers_on_confirmation_token", unique: true
    t.index ["email"], name: "index_job_seekers_on_email", unique: true
    t.index ["prefecture_id"], name: "index_job_seekers_on_prefecture_id"
    t.index ["reset_password_token"], name: "index_job_seekers_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_job_seekers_on_uid_and_provider", unique: true
  end

  create_table "job_types", charset: "utf8mb4", collation: "utf8mb4_general_ci", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "prefectures", charset: "utf8mb4", collation: "utf8mb4_general_ci", force: :cascade do |t|
    t.string "name"
    t.string "name_kana"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "job_seeker_job_types", "job_seekers"
  add_foreign_key "job_seeker_job_types", "job_types"
  add_foreign_key "job_seekers", "prefectures"
end
