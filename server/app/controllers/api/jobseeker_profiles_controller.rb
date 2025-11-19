class Api::JobseekerProfilesController < ApplicationController
  before_action :authenticate_api_job_seeker!

  def profile
    p current_api_job_seeker.as_json(only: %i[id first_name last_name gender birth_date self_introduction])
    render json: current_api_job_seeker.as_json(only: %i[id first_name last_name gender birth_date self_introduction])
  end
end
