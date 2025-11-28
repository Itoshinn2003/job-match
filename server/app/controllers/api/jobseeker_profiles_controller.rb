class Api::JobseekerProfilesController < ApplicationController
  include DeviseTokenAuth::Concerns::SetUserByToken
  before_action :authenticate_api_job_seeker!

  def profile
    render json: current_api_job_seeker.as_json(
      only: %i[id first_name last_name gender birth_date self_introduction],
      include: { prefecture: { only: %i[id name] }, job_types: { only: %i[id name] } }
    )
  end

  def update
    profile = current_api_job_seeker

    if profile.update(profile_params)
      render json: profile, status: :ok
    else
      render json: { errors: profile.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private
  def profile_params
    permitted = params.permit(
      :first_name,
      :last_name,
      :gender,
      :birth_date,
      :self_introduction,
      :selectedPrefectureId,
      selectedJobTypeIds: []
    )

    if permitted.key?(:selectedPrefectureId)
      permitted[:prefecture_id] = permitted.delete(:selectedPrefectureId)
    end

    if permitted.key?(:selectedJobTypeIds)
      permitted[:job_type_ids] = permitted.delete(:selectedJobTypeIds)
    end
    permitted
  end
end
