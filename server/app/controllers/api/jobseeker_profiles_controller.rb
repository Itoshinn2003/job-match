class Api::JobseekerProfilesController < ApplicationController
  before_action :authenticate_api_job_seeker!

  def profile
    render json: current_api_job_seeker.as_json(
      only: %i[id first_name last_name gender birth_date self_introduction], 
      include: { prefecture: { only: %i[name] }, job_types: { only: %i[name]} }
    )
  end
end
