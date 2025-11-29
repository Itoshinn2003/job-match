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

    # validates :password, length: { in: 8..20 }
    validates :self_introduction, length: { maximum: 500 }, allow_nil: true
    enum gender: { male: 1, female: 2 }
end



# birth_date: "2025-11-06"