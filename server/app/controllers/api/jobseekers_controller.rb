class Api::JobseekersController < DeviseTokenAuth::RegistrationsController

  def create
    existing = JobSeeker.find_by(email: sign_up_params[:email])

    unless existing&.confirmed? 
      existing.send_confirmation_instructions
      render json: {
        status: "success"
      }
      return
    end
    
    super
  end

  private

  def sign_up_params
    permitted = params.permit(:email, :password, :confirm_success_url)
    permitted.delete(:confirm_success_url)
    permitted
  end
end
