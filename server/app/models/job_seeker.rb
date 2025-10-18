class JobSeeker < ApplicationRecord
    extend Devise::Models
    # Include default devise modules.
    devise :database_authenticatable, :registerable,
            :recoverable, :rememberable, :validatable,
            :confirmable, :omniauthable

    include DeviseTokenAuth::Concerns::User
end
