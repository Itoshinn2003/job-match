class AddColumnsToJobSeeker < ActiveRecord::Migration[7.1]
  def change
    add_column :job_seekers, :first_name, :string
    add_column :job_seekers, :last_name, :string
    add_column :job_seekers, :gender, :string
    add_column :job_seekers, :birth_date, :string
    add_column :job_seekers, :self_introduction, :string
    add_reference :job_seekers, :prefecture, foreign_key: true

    remove_column :job_seekers, :name, :string
    remove_column :job_seekers, :nickname, :string
  end
end
