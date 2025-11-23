class JobSeeker < ApplicationRecord
    extend Devise::Models
    # Include default devise modules.
    devise :database_authenticatable, :registerable,
            :recoverable, :rememberable, :validatable,
            :confirmable, :omniauthable

    include DeviseTokenAuth::Concerns::User

    belongs_to :prefecture, optional: true 
    has_many :job_seeker_job_types
    has_many :job_types, through: :job_seeker_job_types
end
