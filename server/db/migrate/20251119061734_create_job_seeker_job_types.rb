class CreateJobSeekerJobTypes < ActiveRecord::Migration[7.1]
  def change
    create_table :job_seeker_job_types do |t|
      t.references :job_seeker, null: false, foreign_key: true
      t.references :job_type, null: false, foreign_key: true

      t.timestamps
    end
  end
end
