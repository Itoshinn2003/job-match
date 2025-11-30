class ChangeColumnToJobSeeker < ActiveRecord::Migration[7.1]
  def change
    change_column :job_seekers, :gender, :integer
  end
end
