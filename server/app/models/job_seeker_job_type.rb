class JobSeekerJobType < ApplicationRecord
  belongs_to :job_seeker
  belongs_to :job_type
end
