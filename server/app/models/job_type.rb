class JobType < ApplicationRecord
    has_many :job_seeker_job_types
    has_many :job_seekers, through: :job_seeker_job_types
end
